import { Request, Response } from "express";

import { Prisma, User } from "@prisma/client";

import { EntityKey, EntityModels, PermissionModels } from "@/types";
import { forbidden, successfulResponse } from "@/utils";

type DeleteEntityOptions<T, P> = {
  delete: (id: string) => Prisma.PrismaPromise<T>;
  hasPermission: (user: User, entity: P extends void ? T : P) => boolean;
  message: string | ((deletedEntity: T) => string);
  entityKey: EntityKey | (string & {});
};

export function deleteEntity<
  T extends EntityModels,
  P extends PermissionModels | void = void,
>({
  delete: deleteEntity,
  entityKey,
  hasPermission,
  message,
}: DeleteEntityOptions<T, P>) {
  return async (req: Request, res: Response) => {
    const { user, [entityKey]: entity } = req.body;

    if (entity == null) {
      throw new Error(`entityKey ${entityKey} is not a valid entityKey.`);
    }

    if (!hasPermission(user, entity)) {
      return forbidden(res);
    }

    const deletedEntity = await deleteEntity(entity.id);

    const finalMessage =
      typeof message === "string" ? message : message(deletedEntity);

    successfulResponse({ res, message: finalMessage });
  };
}
