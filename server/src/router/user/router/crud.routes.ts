// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

import { Router } from "express";

import { User } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  idAuthorization,
  imageAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { deleteEntity } from "@/middlewares/features/crud.middleware";
import { sharedUserService } from "@/services";
import { createUploader } from "@/utils";
import { slugValidation } from "@/validators";

import userLogger from "../constants/logger";
import USER_MESSAGES from "../constants/messages";
import PATH from "../constants/path";
import CrudController from "../controllers/crud.controller";
import { hasUserPermission } from "../lib/permissions";
import userService from "../services/user.db";
import { userLoggerData } from "../utils";
import CrudValidator from "../validators/crud.validator";

function createUserCrudRoutes(router: Router) {
  const avatarImageUploader = createUploader(
    "../../../../uploads/avatarImage/"
  );

  const { getUser, getAll, createUser, updateUser, editProfile } =
    new CrudController();

  const { createUserValidation, updateUserValidation, editProfileValidation } =
    new CrudValidator();

  const viewPermission = allResourcePermission((user) =>
    hasUserPermission(user, "view")
  );

  router.get(PATH.getByToken, jwtAuthorization, getUser);
  router.get("/", jwtAuthorization, viewPermission, getAll);
  router.get(
    "/:id",
    slugValidation(),
    idAuthorization({
      entityKey: "user",
      getByIdQuery: sharedUserService.getById,
    }),
    getUser
  );

  const createPermission = allResourcePermission((user) =>
    hasUserPermission(user, "create")
  );

  router.post(
    "/",
    createUserValidation(),
    jwtAuthorization,
    createPermission,
    avatarImageUploader.single("avatarImage"),
    imageAuthorization(),
    createUser
  );

  const updatePermission = specificResourcePermission<User>({
    entityKey: "userToUpdate",
    hasPermission: (user, userToUpdate) =>
      hasUserPermission(user, "update", userToUpdate),
  });

  router.put(
    "/:id",
    updateUserValidation(),
    jwtAuthorization,
    idAuthorization({
      entityKey: "userToUpdate",
      entityName: "کاربری",
      getByIdQuery: sharedUserService.getById,
    }),
    updatePermission,
    avatarImageUploader.single("avatarImage"),
    imageAuthorization(),
    updateUser
  );

  router.put(
    PATH.editProfile,
    editProfileValidation(),
    jwtAuthorization,
    avatarImageUploader.single("avatarImage"),
    imageAuthorization(),
    editProfile
  );

  function userDeleteMessage(user: User) {
    const { delete: deleteMessage } = SHARED_MESSAGES.features.crud;
    userLogger.info("User deleted.", userLoggerData(user));

    return deleteMessage(USER_MESSAGES.crud.action(user));
  }

  const userToDelete = deleteEntity({
    delete: userService.delete,
    entityKey: "userToDelete",
    hasPermission: (user, userToDelete) =>
      hasUserPermission(user, "delete", userToDelete),
    message: userDeleteMessage,
  });

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    idAuthorization({
      entityKey: "userToDelete",
      entityName: "کاربری",
      getByIdQuery: sharedUserService.getById,
    }),
    userToDelete
  );
}

export default createUserCrudRoutes;
