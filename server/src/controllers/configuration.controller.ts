import { NextFunction, Request, Response } from "express";

import autoBind from "auto-bind";

import { errorLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import SHARED_DB from "@/db";
import { SendEmailReq } from "@/types";
import {
  badRequest,
  CompileHandlebarsTemplateOptions,
  Email,
  failedResponse,
  getEmailRemainingTime,
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

abstract class ControllerConfiguration {
  protected readonly SHARED_MESSAGES;
  protected readonly SHARED_DB;
  protected readonly STATUS_CODES;

  protected readonly successfulResponse;

  protected readonly failedResponse;
  protected readonly badRequest;
  protected readonly unauthorized;

  constructor() {
    autoBind(this);
    this.SHARED_MESSAGES = SHARED_MESSAGES;
    this.SHARED_DB = SHARED_DB;
    this.STATUS_CODES = STATUS_CODES;

    this.successfulResponse = successfulResponse;

    this.failedResponse = failedResponse;
    this.badRequest = badRequest;
    this.unauthorized = unauthorized;
  }

  async jwtAuthorization(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];

    const unauthorizedMessage = {
      message: this.SHARED_MESSAGES.common.general.jwtAuthorization,
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
      const { internalServerError } = this.STATUS_CODES;
      const { failedMessage, successful } =
        this.SHARED_MESSAGES.common.general.sendEmail;

      const { user, email } = req.body;
      const finalEmail = email ?? user.email;

      const verificationEmail = new Email({
        subject,
        users: [finalEmail],
        ...restOptions,
      });
      const { isSuccessful } = await verificationEmail.send();

      if (!isSuccessful) {
        return this.failedResponse({
          res,
          code: internalServerError,
          message: this.SHARED_MESSAGES.failed(failedMessage),
        });
      }

      const remainingTime = getEmailRemainingTime();
      await this.SHARED_DB.user.setEmailRemainingTime(
        finalEmail,
        remainingTime
      );

      if (!isSendResponseNeed) return;

      this.successfulResponse({
        res,
        message: successful(email),
        data: {
          remainingTime,
        },
      });
    };
  }
}

export default ControllerConfiguration;
