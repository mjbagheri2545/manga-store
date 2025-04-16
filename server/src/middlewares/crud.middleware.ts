import { Request, Response } from "express";

import { Prisma, User } from "@prisma/client";

import { EntityKey, PaginateQuery } from "@/types";
import { failedOperation, forbidden, successfulResponse } from "@/utils";

type DeleteEntityOptions<T, P> = {
  delete: (id: string) => Prisma.PrismaPromise<T>;
  hasPermission: (user: User, entity: P extends void ? T : P) => boolean;
  message: string | ((deletedEntity: T) => string);
  entityKey: EntityKey | (string & {});
  operation?: (entity: P extends void ? T : P) => Promise<Error | void>;
  failedOperationMessage?: string;
};

export function deleteEntity<T extends { id: string }, P = void>({
  delete: deleteEntity,
  entityKey,
  hasPermission,
  message,
  failedOperationMessage,
  operation,
}: DeleteEntityOptions<T, P>) {
  return async (req: Request, res: Response) => {
    const { user, [entityKey]: entity } = req.body;

    if (entity == null) {
      throw new Error(`entityKey ${entityKey} is not a valid entityKey.`);
    }

    if (!hasPermission(user, entity)) {
      return forbidden(res);
    }

    // operation is removing product Image for example
    const error = await operation?.(entity);

    if (error != null) {
      return failedOperation({
        res,
        message: failedOperationMessage ?? "",
      });
    }

    const deletedEntity = await deleteEntity(entity.id);

    const finalMessage =
      typeof message === "string" ? message : message(deletedEntity);

    successfulResponse({
      res,
      message: finalMessage,
      data: { id: deletedEntity.id },
    });
  };
}

type GetAllEntitiesOptions<T, Q> = {
  getAll: (query: Q) => Promise<[T[], number] | readonly [T[], number]>;
  entitiesKey: string;
};

export function getAllEntities<T, Q extends PaginateQuery = PaginateQuery>({
  getAll,
  entitiesKey,
}: GetAllEntitiesOptions<T, Q>) {
  return async (req: Request<any, any, any, Q>, res: Response) => {
    const [entities, count] = await getAll(req.query);

    successfulResponse({ res, data: { [entitiesKey]: entities, count } });
  };
}
