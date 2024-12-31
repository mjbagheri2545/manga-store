import { NextFunction, Request, Response } from "express";

import autoBind from "auto-bind";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs/promises";
import { PrismaPromise, User } from "@prisma/client";

import { errorLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import SHARED_DB from "@/db";
import { SendEmailReq, UserAuthorizedReq } from "@/types";
import {
  badRequest,
  CompileHandlebarsTemplateOptions,
  Email,
  failedResponse,
  forbidden,
  getEmailRemainingTime,
  notFound,
  successfulResponse,
  unauthorized,
  verifyJwtToken,
} from "@/utils";

type SendEmailOptions<T> = {
  subject: string;
  templateVariables: T;
  templateOptions: CompileHandlebarsTemplateOptions;
  isSendResponseNeed?: boolean;
};

type AllowedType = {
  name: string;
  mime: string;
};

type GetByIdOptions<T> = {
  entityName: string;
  entityKey: string;
  getByIdQuery: (id: string) => PrismaPromise<T | null>;
};
abstract class ControllerConfiguration {
  protected readonly SHARED_MESSAGES;
  protected readonly SHARED_DB;
  protected readonly STATUS_CODES;

  protected readonly successfulResponse;

  protected readonly failedResponse;
  protected readonly badRequest;
  protected readonly unauthorized;
  protected readonly forbidden;
  protected readonly notFound;

  constructor() {
    autoBind(this);
    this.SHARED_MESSAGES = SHARED_MESSAGES;
    this.SHARED_DB = SHARED_DB;
    this.STATUS_CODES = STATUS_CODES;

    this.successfulResponse = successfulResponse;

    this.failedResponse = failedResponse;
    this.badRequest = badRequest;
    this.unauthorized = unauthorized;
    this.forbidden = forbidden;
    this.notFound = notFound;
  }

  async jwtAuthorization(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];

    const { jwtAuthorization: jwtAuthorizationMessage } =
      this.SHARED_MESSAGES.general;

    const unauthorizedMessage = {
      message: jwtAuthorizationMessage,
      isFullMessage: true,
    };

    if (token == null) {
      return this.unauthorized(res, unauthorizedMessage);
    }

    try {
      const { data: userId } = await verifyJwtToken<{ data: string }>(token);
      const user = await this.SHARED_DB.user.getById(userId);
      if (user == null) {
        return this.unauthorized(res, unauthorizedMessage);
      }

      req.body.user = user;
      next();
    } catch (error) {
      errorLogger.log("error", error);
      return this.unauthorized(res, unauthorizedMessage);
    }
  }

  protected sendEmail<T>({
    subject,
    isSendResponseNeed = true,
    ...restOptions
  }: SendEmailOptions<T>) {
    return async (req: SendEmailReq, res: Response) => {
      const { user, email } = req.body;
      const finalEmail = email ?? user.email;

      const verificationEmail = new Email({
        subject,
        users: [finalEmail],
        ...restOptions,
      });
      const { isSuccessful } = await verificationEmail.send();

      if (!isSuccessful) {
        const { failed: failedMessage } =
          this.SHARED_MESSAGES.general.sendEmail;

        return this.failedResponse({
          res,
          code: this.STATUS_CODES.internalServerError,
          message: failedMessage,
        });
      }

      const remainingTime = getEmailRemainingTime();
      await this.SHARED_DB.user.setEmailRemainingTime(
        finalEmail,
        remainingTime
      );

      if (!isSendResponseNeed) return;

      const { successful: successfulMessage } =
        this.SHARED_MESSAGES.general.sendEmail;

      this.successfulResponse({
        res,
        message: successfulMessage(email),
        data: {
          remainingTime,
        },
      });
    };
  }

  permissionAuthorization(hasPermission: (user: User) => boolean) {
    return (req: UserAuthorizedReq, res: Response, next: NextFunction) => {
      const { user } = req.body;

      if (!hasPermission(user)) {
        return this.forbidden(res);
      }

      next();
    };
  }

  fileAuthorization(allowedTypes: AllowedType[] | readonly AllowedType[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.file == null) return next();

      const buffer = await fs.readFile(req.file.path);
      const type = await fileTypeFromBuffer(buffer);

      const isAllowed =
        type != null &&
        allowedTypes.map((item) => item.mime).includes(type.mime);

      if (!isAllowed) {
        const typesName = allowedTypes.map((item) => item.name);
        const message = this.SHARED_MESSAGES.general.invalidFile(
          typesName.join(", ")
        );

        return this.badRequest(res, { isFullMessage: true, message });
      }

      next();
    };
  }

  getById<T>({ entityName, entityKey, getByIdQuery }: GetByIdOptions<T>) {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const entity = await getByIdQuery(id);

      if (entity == null) {
        return this.notFound({ res, entityName, entityInfo: "آیدی" });
      }

      req.body[entityKey] = entity;
    };
  }
}

export default ControllerConfiguration;
