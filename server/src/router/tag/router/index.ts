import { Router } from "express";

import Controller from "../controllers";
import { hasTagPermission } from "../lib/permissions";
import Validator from "../validators";

function createTagRouter() {
  const router = Router();

  const {
    jwtAuthorization,
    permissionAuthorization,
    getAll,
    createTag,
    updateTag,
    deleteTag,
  } = new Controller();

  const { slugValidation, createTagValidation, updateTagValidation } =
    new Validator();

  router.get("/", jwtAuthorization, getAll);

  router.post(
    "/",
    createTagValidation(),
    jwtAuthorization,
    permissionAuthorization((user) => hasTagPermission(user, "create")),
    createTag
  );

  router.put("/:id", updateTagValidation(), jwtAuthorization, updateTag);

  router.delete("/:id", slugValidation(), jwtAuthorization, deleteTag);

  return router;
}

export default createTagRouter;
