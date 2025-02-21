import { Request, Response } from "express";

import { Prisma, User } from "@prisma/client";

import { EntityKey, Model, PaginateQuery, PermissionModels } from "@/types";
import { forbidden, successfulResponse } from "@/utils";

type DeleteEntityOptions<T, P> = {
  delete: (id: string) => Prisma.PrismaPromise<T>;
  hasPermission: (user: User, entity: P extends void ? T : P) => boolean;
  message: string | ((deletedEntity: T) => string);
  entityKey: EntityKey | (string & {});
};

export function deleteEntity<
  T extends Model,
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

type GetAllEntitiesOptions<T, Q> = {
  service: {
    getAll: (query: Q) => Prisma.PrismaPromise<T[]>;
    count: () => Prisma.PrismaPromise<number>;
  };
  entitiesKey: string;
};

export function getAllEntities<T, Q extends PaginateQuery = PaginateQuery>({
  service,
  entitiesKey,
}: GetAllEntitiesOptions<T, Q>) {
  return async (req: Request<any, any, any, Q>, res: Response) => {
    const [entities, count] = await Promise.all([
      service.getAll(req.query),
      service.count(),
    ]);

    successfulResponse({ res, data: { [entitiesKey]: entities, count } });
  };
}
