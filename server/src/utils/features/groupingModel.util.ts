import { Router } from "express";

import { ENTITY_NAMES } from "@/constants/entities";
import SHARED_MESSAGES from "@/constants/messages";
import GroupingModelsController, {
  GroupingModelsControllerOptions,
} from "@/controllers/groupingModel.controller";
import { hasGroupingModelPermission } from "@/lib/groupingModelPermissions";
import { idAuthorization, jwtAuthorization } from "@/middlewares";
import { deleteEntity } from "@/middlewares/features/crud.middleware";
import {
  allResourcePermission,
  specificResourcePermission,
} from "@/middlewares/permission.middleware";
import { GroupingModels } from "@/types";
import { GroupingModelsValidator, slugValidation } from "@/validators";

import { upperFirst } from "../general.util";

export function createGroupingModelsRouter<T extends GroupingModels>(
  options: GroupingModelsControllerOptions<T>
) {
  const router = Router();

  const { entityKey, service, logger } = options;

  const { getAllEntities, createEntity, updateEntity } =
    new GroupingModelsController(options);

  const { createEntityValidation, updateEntityValidation } =
    new GroupingModelsValidator();

  router.get("/", jwtAuthorization, getAllEntities);

  const createPermission = allResourcePermission((user) =>
    hasGroupingModelPermission(user, "create")
  );

  router.post(
    "/",
    createEntityValidation(entityKey),
    jwtAuthorization,
    createPermission,
    createEntity
  );

  const updatePermission = specificResourcePermission<T>({
    entityKey,
    hasPermission: (user, entity) =>
      hasGroupingModelPermission(user, "update", entity),
  });

  const getEntityById = idAuthorization({
    entityKey: entityKey,
    getByIdQuery: service.getById,
  });

  router.put(
    "/:id",
    updateEntityValidation(entityKey),
    jwtAuthorization,
    getEntityById,
    updatePermission,
    updateEntity
  );

  function deleteGroupingModelEntityMessage(entity: T) {
    const { crud: crudMessage, groupingModel: groupingModelMessage } =
      SHARED_MESSAGES.features;

    const entityName = ENTITY_NAMES[entityKey];

    logger.logMessage(`${upperFirst(entityKey)} delete.`, {
      metaData: { [entityKey]: entity },
    });

    return crudMessage.delete(groupingModelMessage.crud(entity, entityName));
  }

  const deleteGroupingModelEntity = deleteEntity({
    delete: service.delete,
    entityKey,
    hasPermission: (user, entity) =>
      hasGroupingModelPermission(user, "delete", entity),
    message: deleteGroupingModelEntityMessage,
  });

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getEntityById,
    deleteGroupingModelEntity
  );

  return router;
}
