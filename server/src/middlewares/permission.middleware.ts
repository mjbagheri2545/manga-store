import { NextFunction, Request, Response } from "express";

import { User } from "@prisma/client";

import { EntityKey, PermissionModels, UserAuthorizedReq } from "@/types";
import { forbidden } from "@/utils";

export function allResourcePermission(hasPermission: (user: User) => boolean) {
  return (req: UserAuthorizedReq, res: Response, next: NextFunction) => {
    const { user } = req.body;

    if (!hasPermission(user)) {
      return forbidden(res);
    }

    next();
  };
}

type SpecificResourcePermissionOptions<T> = {
  hasPermission: (user: User, entity: T) => boolean;
  entityKey: EntityKey | (string & {});
};

export function specificResourcePermission<T extends PermissionModels>({
  hasPermission,
  entityKey,
}: SpecificResourcePermissionOptions<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user, [entityKey]: entity } = req.body;

    if (entity == null) {
      throw new Error(`entityKey ${entityKey} is not a valid entityKey.`);
    }

    if (!hasPermission(user, entity)) {
      return forbidden(res);
    }

    next();
  };
}
