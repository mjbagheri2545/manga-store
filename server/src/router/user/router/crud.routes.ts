// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

import { Router } from "express";

import multer from "multer";

import SHARED_MESSAGES from "@/constants/messages";
import {
  deleteEntity,
  fileSizeChecker,
  hasGeneralPermission,
  hasSpecificPermission,
  idAuthorization,
  jwtAuthorization,
} from "@/middlewares";
import { getAllEntities } from "@/middlewares/crud.middleware";
import { imageAuthorization } from "@/middlewares/features/user_product.middleware";
import sharedUserService from "@/services/user.service";
import { PermissionUser } from "@/types";
import { getFilePathFromDbFilePath, removeFile } from "@/utils";
import { userLoggerData } from "@/utils/features/auth_user.util";
import { slugValidation } from "@/validators";

import {
  PERMISSION_USER_SELECT,
  USER_BASE_SELECT,
  UserBase,
  userLogger,
} from "../constants/global";
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
  const {
    getUser,
    getAllManagers,
    getAllTranslators,
    createUser,
    updateUser,
    editProfile,
  } = new UserCrudController();

  const { createUserValidation, updateUserValidation, editProfileValidation } =
    new UserCrudValidator();

  const viewPermission = hasGeneralPermission((user) =>
    hasUserPermission(user, "view")
  );

  const getAllUsers = getAllEntities({
    getAll: userService.getAll,
    entitiesKey: "users",
  });

  router.get("/", jwtAuthorization, viewPermission, getAllUsers);

  router.get(USER_PATH.getManagers, jwtAuthorization, getAllManagers);
  router.get(USER_PATH.getTranslators, jwtAuthorization, getAllTranslators);

  router.get(USER_PATH.getByToken, jwtAuthorization, getUser);
  router.get(
    "/:id",
    slugValidation(),
    idAuthorization({
      entityKey: "user",
      getByIdQuery: (id: string) =>
        sharedUserService.getById(id, {
          select: USER_BASE_SELECT,
        }),
    }),
    getUser
  );

  const createPermission = hasGeneralPermission((user) =>
    hasUserPermission(user, "create")
  );

  router.post(
    "/",
    avatarImageUploader.single("avatarImage"),
    fileSizeChecker(AVATAR_IMAGE_SIZE_LIMIT, "MB"),
    createUserValidation(),
    jwtAuthorization,
    createPermission,
    imageAuthorization(),
    createUser
  );

  const updatePermission = hasSpecificPermission<PermissionUser>({
    entityKey: "userToUpdate",
    hasPermission: (user, userToUpdate) =>
      hasUserPermission(user, "update", userToUpdate),
  });

  router.put(
    "/:id",
    avatarImageUploader.single("avatarImage"),
    fileSizeChecker(AVATAR_IMAGE_SIZE_LIMIT, "MB"),
    updateUserValidation(),
    jwtAuthorization,
    idAuthorization({
      entityKey: "userToUpdate",
      entityName: "کاربری",
      getByIdQuery: sharedUserService.getById,
    }),
    updatePermission,
    imageAuthorization(),
    updateUser
  );

  router.put(
    USER_PATH.editProfile,
    avatarImageUploader.single("avatarImage"),
    fileSizeChecker(AVATAR_IMAGE_SIZE_LIMIT, "MB"),
    editProfileValidation(),
    jwtAuthorization,
    imageAuthorization(),
    editProfile
  );

  function userDeleteMessage(user: UserBase) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;
    userLogger.logMessage("User deleted.", { metaData: userLoggerData(user) });

    return deleteMessage(USER_MESSAGES.crud.action(user));
  }

  async function deleteUserOperation(user: PermissionUser) {
    if (user.avatarImage == null) return;

    return removeFile(
      getFilePathFromDbFilePath(user.avatarImage, { isPublic: false })
    );
  }

  const deleteUser = deleteEntity<UserBase, PermissionUser>({
    delete: userService.delete,
    operation: deleteUserOperation,
    failedOperationMessage: "حذف کاربر",
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
      getByIdQuery: (id: string) =>
        sharedUserService.getById(id, {
          select: PERMISSION_USER_SELECT,
        }),
    }),
    deleteUser
  );
}

export default createUserCrudRoutes;
