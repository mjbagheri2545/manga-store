import { Request, Response } from "express";

import { $Enums, Prisma, User } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import sharedUserService from "@/services/user.service";
import { Req, UserAuthorizedReq } from "@/types";
import {
  badRequest,
  failedOperation,
  getFilePath,
  getFilePathForDb,
  pick,
  removeFile,
  successfulResponse,
  withCatch,
  writeFile,
} from "@/utils";
import {
  hashPassword,
  pickUserData,
  userLoggerData,
} from "@/utils/features/auth_user.util";

import userLogger from "../constants/logger";
import USER_MESSAGES from "../constants/messages";
import userService from "../services/user.service";
import { pickUserCreateData, updateAvatarImage } from "../utils";

type CreateUserReqBody = Pick<
  Prisma.UserCreateInput,
  "email" | "fullName" | "password"
> & {
  role: $Enums.Role;
  bio: string;
  walletBalanceInToman?: string;
};

type CreateUserReq = UserAuthorizedReq<CreateUserReqBody>;

type UpdateUserReq = Req<Partial<CreateUserReqBody> & { userToUpdate: User }>;

type EditProfileReq = UserAuthorizedReq<
  Partial<{
    email: string;
    bio: string;
    fullName: string;
  }>
>;
class UserCrudController {
  getUser(req: UserAuthorizedReq, res: Response) {
    const { user } = req.body;

    successfulResponse({ res, data: { user: pickUserData(user) } });
  }

  async getAllManagers(_req: Request, res: Response) {
    const managers = await userService.getManagers();

    successfulResponse({ res, data: { managers } });
  }

  async getAllTranslators(_req: Request, res: Response) {
    const translators = await userService.getTranslators();

    successfulResponse({ res, data: { translators } });
  }

  async createUser(req: CreateUserReq, res: Response) {
    const { role, password, walletBalanceInToman, ...restData } =
      pickUserCreateData(req) as CreateUserReqBody;

    const roles: $Enums.Role[] = ["user", ...(role === "user" ? [] : [role])];

    const hashedPassword = await hashPassword(password);

    const data: Prisma.UserCreateInput = {
      ...restData,
      password: hashedPassword,
      roles: { set: roles },
    };

    if (req.file != null) {
      const avatarImagePath = await getFilePath({
        uploadPath: "private/uploads/avatarImage",
        file: req.file,
        isPublic: false,
      });

      data.avatarImage = getFilePathForDb(avatarImagePath);
    }

    if (walletBalanceInToman != null) {
      data.walletBalanceInToman = parseInt(walletBalanceInToman);
    }

    const [error, user] = await withCatch(sharedUserService.create(data));

    if (error != null) {
      return failedOperation({
        res,
        message: "افزودن کاربر",
      });
    }

    if (req.file != null) {
      const writeFileError = await writeFile(
        data.avatarImage as string,
        req.file.buffer
      );

      if (writeFileError != null) {
        // remove chunks of file that has been written to server
        // and then delete already created product
        await removeFile(data.avatarImage as string);
        await userService.delete(user.id);
        return failedOperation({
          res,
          message: "افزودن کاربر",
        });
      }
    }

    userLogger.logMessage("User created.", {
      metaData: { user: userLoggerData(user) },
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    const message = createMessage(USER_MESSAGES.crud.action(user));

    successfulResponse({ res, message, data: { id: user.id } });
  }

  async updateUser(req: UpdateUserReq, res: Response) {
    const { role, password, walletBalanceInToman, ...restData } =
      pickUserCreateData(req) as Partial<CreateUserReqBody>;

    const { userToUpdate } = req.body;

    const data: Prisma.UserUpdateInput = restData;

    if (role != null && !userToUpdate.roles.includes(role)) {
      data.roles = { set: [...userToUpdate.roles, role] };
    }

    if (password != null) {
      const hashedPassword = await hashPassword(password);
      const isSamePassword =
        hashedPassword === userToUpdate.password ||
        userToUpdate.oldPasswords.includes(hashedPassword);

      if (isSamePassword) {
        return badRequest(res, USER_MESSAGES.crud.samePassword);
      }

      data.password = hashedPassword;
      data.oldPasswords = { push: userToUpdate.password };
    }

    if (req.file != null) {
      const avatarImagePath = await getFilePath({
        uploadPath: "private/uploads/avatarImage",
        file: req.file,
        isPublic: false,
      });

      data.avatarImage = getFilePathForDb(avatarImagePath);
    }

    if (walletBalanceInToman != null) {
      data.walletBalanceInToman = parseInt(walletBalanceInToman);
    }

    const [error, updatedUser] = await withCatch(
      userService.update(userToUpdate.id, data)
    );

    if (error != null) {
      return failedOperation({ res, message: "به‌روزرسانی کاربر" });
    }

    if (req.file != null) {
      // if req.file != null then data.avatarImage is not null
      const newAvatarImagePath = data.avatarImage as string;

      const updateAvatarImageError = await updateAvatarImage({
        file: req.file,
        newAvatarImagePath,
        oldAvatarImagePath: userToUpdate.avatarImage,
        userId: userToUpdate.id,
      });

      if (updateAvatarImageError != null) {
        return failedOperation({ res, message: "به‌روزرسانی کاربر" });
      }
    }

    userLogger.logMessage("User updated.", {
      metaData: {
        oldUser: pickUserData(userToUpdate),
        updatedUser: pickUserData(updatedUser),
      },
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    const message = updateMessage(USER_MESSAGES.crud.action(updatedUser));

    successfulResponse({ res, message, data: { id: updatedUser.id } });
  }

  async editProfile(req: EditProfileReq, res: Response) {
    const { user } = req.body;

    const data: Prisma.UserUpdateInput = pick(req.body, [
      "bio",
      "email",
      "fullName",
    ]);

    if (req.file != null) {
      const avatarImagePath = await getFilePath({
        uploadPath: "private/uploads/avatarImage",
        file: req.file!,
        isPublic: false,
      });

      data.avatarImage = getFilePathForDb(avatarImagePath);
    }

    const [error, updatedUser] = await withCatch(
      userService.update(user.id, data)
    );

    if (error != null) {
      return failedOperation({ res, message: "ویرایش پروفایل" });
    }

    if (req.file != null) {
      // if req.file != null then data.avatarImage is not null
      const newAvatarImagePath = data.avatarImage as string;

      const updateAvatarImageError = await updateAvatarImage({
        file: req.file,
        newAvatarImagePath,
        oldAvatarImagePath: user.avatarImage,
        userId: user.id,
      });

      if (updateAvatarImageError != null) {
        return failedOperation({ res, message: "ویرایش پروفایل" });
      }
    }

    userLogger.logMessage("User profile edited.", {
      metaData: {
        oldUser: pickUserData(user),
        updatedUser: pickUserData(updatedUser),
      },
    });

    successfulResponse({
      res,
      message: USER_MESSAGES.editProfile,
    });
  }
}

export default UserCrudController;
