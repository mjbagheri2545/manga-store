// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

import { Router } from "express";

import multer from "multer";
import { User } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  deleteEntity,
  idAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { getAllEntities } from "@/middlewares/crud.middleware";
import { imageAuthorization } from "@/middlewares/features/user_product.middleware";
import sharedUserService from "@/services/user.service";
import { userLoggerData } from "@/utils/features/auth_user.util";
import { slugValidation } from "@/validators";

import userLogger from "../constants/logger";
import USER_MESSAGES from "../constants/messages";
import USER_PATH from "../constants/path";
import UserCrudController from "../controllers/crud.controller";
import { hasUserPermission } from "../lib/permissions";
import userService from "../services/user.service";
import UserCrudValidator from "../validators/crud.validator";

// 10 MB
const AVATAR_IMAGE_SIZE_LIMIT = 50 * 1024 * 1024;

function createUserCrudRoutes(router: Router) {
  const avatarImageUploader = multer({
    storage: multer.memoryStorage(),
    limits: { files: 1, fileSize: AVATAR_IMAGE_SIZE_LIMIT },
  });
  const { getUser, getAllManagers, createUser, updateUser, editProfile } =
    new UserCrudController();

  const { createUserValidation, updateUserValidation, editProfileValidation } =
    new UserCrudValidator();

  const viewPermission = allResourcePermission((user) =>
    hasUserPermission(user, "view")
  );

  const getAllUsers = getAllEntities({
    service: userService,
    entitiesKey: "users",
  });

  router.get("/", jwtAuthorization, viewPermission, getAllUsers);

  router.get(USER_PATH.getManagers, jwtAuthorization, getAllManagers);

  router.get(USER_PATH.getByToken, jwtAuthorization, getUser);
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
    USER_PATH.editProfile,
    editProfileValidation(),
    jwtAuthorization,
    avatarImageUploader.single("avatarImage"),
    imageAuthorization(),
    editProfile
  );

  function userDeleteMessage(user: User) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;
    userLogger.logMessage("User deleted.", { metaData: userLoggerData(user) });

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
