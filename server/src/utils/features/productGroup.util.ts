import { Router } from "express";

import { ENTITY_NAMES } from "@/constants/global/general.global";
import SHARED_MESSAGES from "@/constants/messages";
import PRODUCT_GROUP_MESSAGES from "@/constants/messages/features/productGroup.message";
import ProductGroupModelController, {
  ProductGroupModelControllerOptions,
} from "@/controllers/productGroup.controller";
import { hasProductGroupModelPermission } from "@/lib/productGroupPermissions";
import { deleteEntity, idAuthorization, jwtAuthorization } from "@/middlewares";
import { getAllEntities } from "@/middlewares/crud.middleware";
import {
  allResourcePermission,
  specificResourcePermission,
} from "@/middlewares/permission.middleware";
import { ProductGroupModel, ProductGroupModelEntityKey } from "@/types";
import { slugValidation } from "@/validators";
import { ProductGroupModelValidator } from "@/validators/productGroup.validator";

import { upperFirst } from "../general.util";

function getPluralName(key: ProductGroupModelEntityKey) {
  switch (key) {
    case "category":
      return "categories";

    case "productStatus":
      return "productStatuses";

    default:
      return "tags";
  }
}

export function createProductGroupModelRouter<T extends ProductGroupModel>(
  options: ProductGroupModelControllerOptions<T>
) {
  const router = Router();

  const { entityKey, service, logger } = options;

  const { getEntity, createEntity, updateEntity } =
    new ProductGroupModelController(options);

  const { createEntityValidation, updateEntityValidation } =
    new ProductGroupModelValidator(entityKey);

  const entitiesKey = getPluralName(entityKey);
  const getAllProductGroupEntities = getAllEntities({ service, entitiesKey });

  router.get("/", jwtAuthorization, getAllProductGroupEntities);

  const getEntityById = idAuthorization({
    entityKey: entityKey,
    getByIdQuery: service.getById,
  });

  router.get("/:id", jwtAuthorization, getEntityById, getEntity);

  const createPermission = allResourcePermission((user) =>
    hasProductGroupModelPermission(user, "create")
  );

  router.post(
    "/",
    createEntityValidation(),
    jwtAuthorization,
    createPermission,
    createEntity
  );

  const updatePermission = specificResourcePermission<T>({
    entityKey,
    hasPermission: (user, entity) =>
      hasProductGroupModelPermission(user, "update", entity),
  });

  router.put(
    "/:id",
    updateEntityValidation(),
    jwtAuthorization,
    getEntityById,
    updatePermission,
    updateEntity
  );

  function deleteProductGroupModelEntityMessage(entity: T) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;

    const entityName = ENTITY_NAMES[entityKey];

    logger.logMessage(`${upperFirst(entityKey)} delete.`, {
      metaData: { [entityKey]: entity },
    });

    return deleteMessage(PRODUCT_GROUP_MESSAGES.crud(entity, entityName));
  }

  const deleteProductGroupModelEntity = deleteEntity({
    delete: service.delete,
    entityKey,
    hasPermission: (user, entity) =>
      hasProductGroupModelPermission(user, "delete", entity),
    message: deleteProductGroupModelEntityMessage,
  });

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getEntityById,
    deleteProductGroupModelEntity
  );

  return router;
}
