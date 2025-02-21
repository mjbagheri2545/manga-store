import { NextFunction, Request, Response } from "express";

import { fromFile } from "file-type";
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
  return name === "دسته بندی" ? name + " ای" : "ی";
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

type AllowedType = {
  name: string;
  mime: string;
};

export function fileAuthorization(allowedTypes: AllowedType[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.file == null) return next();

    const type = await fromFile(req.file.path);

    const isAllowed =
      type != null && allowedTypes.map((item) => item.mime).includes(type.mime);

    if (!isAllowed) {
      const typesName = allowedTypes.map((item) => item.name);
      const message = SHARED_MESSAGES.general.invalidFile(typesName.join(", "));

      return badRequest(res, { isFullMessage: true, message });
    }

    next();
  };
}
