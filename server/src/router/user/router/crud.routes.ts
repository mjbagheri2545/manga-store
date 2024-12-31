// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

import { Router } from "express";

import SHARED_CONFIG from "@/constants/config";
import { createUploader } from "@/utils";

import PATH from "../constants/path";
import CrudController from "../controllers/crud.controller";
import DB from "../db";
import { hasUserPermission } from "../lib/permissions";
import CrudValidator from "../validators/crud.validator";

function createUserCrudRoutes(router: Router) {
  const avatarImageUploader = createUploader(
    "../../../../uploads/avatarImage/"
  );

  const {
    jwtAuthorization,
    permissionAuthorization,
    fileAuthorization,
    getById,
    getUser,
    getAll,
    createUser,
    updateUser,
    editProfile,
    deleteUser,
  } = new CrudController();

  const {
    slugValidation,
    createUserValidation,
    updateUserValidation,
    editProfileValidation,
  } = new CrudValidator();

  router.get(PATH.getByToken, jwtAuthorization, getUser);
  router.get(
    "/",
    jwtAuthorization,
    permissionAuthorization((user) => hasUserPermission(user, "view")),
    getAll
  );
  router.get(
    "/:id",
    slugValidation(),
    getById({
      entityKey: "user",
      entityName: "کاربری",
      getByIdQuery: DB.user.getById,
    }),
    getUser
  );

  router.post(
    "/",
    createUserValidation(),
    jwtAuthorization,
    permissionAuthorization((user) => hasUserPermission(user, "create")),
    avatarImageUploader.single("avatarImage"),
    fileAuthorization(SHARED_CONFIG.mime.image),
    createUser
  );

  router.put(
    "/:id",
    updateUserValidation(),
    jwtAuthorization,
    getById({
      entityKey: "userToUpdate",
      entityName: "کاربری",
      getByIdQuery: DB.user.getById,
    }),
    avatarImageUploader.single("avatarImage"),
    fileAuthorization(SHARED_CONFIG.mime.image),
    updateUser
  );

  router.put(
    PATH.editProfile,
    editProfileValidation(),
    jwtAuthorization,
    avatarImageUploader.single("avatarImage"),
    fileAuthorization(SHARED_CONFIG.mime.image),
    editProfile
  );

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getById({
      entityKey: "userToDelete",
      entityName: "کاربری",
      getByIdQuery: DB.user.getById,
    }),
    deleteUser
  );
}

export default createUserCrudRoutes;
