import { Router } from "express";

import GroupingModelsController, {
  GroupingModelsControllerProps,
} from "@/controllers/groupingModel.controller";
import { hasGroupingModelPermission } from "@/lib/groupingModelPermissions";
import { GroupingModels } from "@/types";
import GroupingModelsValidator from "@/validators/groupingModel.validator";

export function createGroupingModelsRouter<T extends GroupingModels>(
  props: GroupingModelsControllerProps<T>
) {
  const router = Router();

  const {
    jwtAuthorization,
    permissionAuthorization,
    getAll,
    createEntity,
    updateEntity,
    deleteEntity,
  } = new GroupingModelsController(props);

  const {
    slugValidation,
    createGroupModelValidation,
    updateGroupModelValidation,
  } = new GroupingModelsValidator();

  router.get("/", jwtAuthorization, getAll);

  router.post(
    "/",
    createGroupModelValidation(),
    jwtAuthorization,
    permissionAuthorization((user) =>
      hasGroupingModelPermission(user, "create")
    ),
    createEntity
  );

  router.put(
    "/:id",
    updateGroupModelValidation(),
    jwtAuthorization,
    updateEntity
  );

  router.delete("/:id", slugValidation(), jwtAuthorization, deleteEntity);
}
