import { NextFunction, Request, Response } from "express";

import { fromBuffer } from "file-type";
import { PrismaPromise } from "@prisma/client";

import { ENTITY_NAMES } from "@/constants/global/general.global";
import { errorLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";
import sharedUserService from "@/services/user.service";
import { EntityKey, Model } from "@/types";
import {
  badRequest,
  getError,
  notFound,
  unauthorized,
  verifyJwtToken,
} from "@/utils";

export async function jwtAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];

  if (token == null) {
    return unauthorized(res);
  }

  try {
    const { data: userId } = await verifyJwtToken<{ data: string }>(token);
    const user = await sharedUserService.getById(userId);

    if (user == null) {
      return unauthorized(res);
    }

    req.body.user = user;
    next();
  } catch (error) {
    errorLogger.logMessage(getError(error));
    return unauthorized(res);
  }
}

type GetByIdOptions<T> = {
  getByIdQuery: (id: string) => PrismaPromise<T | null>;
} & ({ entityKey: string; entityName: string } | { entityKey: EntityKey });

function getEntityName(name: string) {
  return name === "دسته بندی" ? name + " ای" : name + "ی";
}

export function idAuthorization<T extends Model>({
  getByIdQuery,
  ...restOptions
}: GetByIdOptions<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const entity = await getByIdQuery(id);

    if (entity == null) {
      const entityName =
        "entityName" in restOptions
          ? restOptions.entityName
          : getEntityName(ENTITY_NAMES[restOptions.entityKey]);

      return notFound({
        res,
        entityName,
        entityInfo: "آیدی",
      });
    }

    req.body[restOptions.entityKey] = entity;
    next();
  };
}

type FileTypeMimeChecker = (mime: string) => boolean;

type FileAuthorizationOptions = {
  invalidMessage: string;
  mimeChecker: FileTypeMimeChecker;
};
export function fileAuthorization({
  invalidMessage,
  mimeChecker,
}: FileAuthorizationOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.file == null) return next();

    const type = await fromBuffer(req.file.buffer);

    const isAllowed = type != null && mimeChecker(type.mime);

    if (!isAllowed) {
      return badRequest(res, { isFullMessage: true, message: invalidMessage });
    }

    next();
  };
}

// "B", "PB" should never happen
type FileSizeUnit = "B" | "KB" | "MB" | "GB" | "PB";

export function fileSizeChecker(fileSizeLimit: number, unit: FileSizeUnit) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.file == null) return next();

    if (req.file.buffer.byteLength > fileSizeLimit) {
      return badRequest(res, {
        isFullMessage: true,
        message: SHARED_MESSAGES.general.tooLargeFile(
          `${fileSizeLimit} ${unit}`
        ),
      });
    }

    next();
  };
}
