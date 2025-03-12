import { Request, Response } from "express";

import { $Enums, Prisma, User } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import sharedUserService from "@/services/user.service";
import { UserAuthorizedReq } from "@/types";
import { badRequest, pick, removeFile, successfulResponse } from "@/utils";
import {
  hashPassword,
  pickUserData,
  userLoggerData,
} from "@/utils/features/auth_user.util";

import userLogger from "../constants/logger";
import USER_MESSAGES from "../constants/messages";
import userService from "../services/user.service";
import { pickUserCreateData } from "../utils";

type CreateUserReqBody = Pick<
  Prisma.UserCreateInput,
  "email" | "fullName" | "password" | "walletBalance"
> & {
  role: $Enums.Role;
  bio: string;
};

type CreateUserReq = UserAuthorizedReq<CreateUserReqBody>;

type UpdateUserReq = UserAuthorizedReq<
  Partial<CreateUserReqBody> & { userToUpdate: User }
>;

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

  async createUser(req: CreateUserReq, res: Response) {
    const { role, password, ...restData } = pickUserCreateData(
      req
    ) as CreateUserReqBody;

    const roles: $Enums.Role[] = ["user", ...(role === "user" ? [] : [role])];

    const hashedPassword = await hashPassword(password);

    const user = await sharedUserService.create({
      ...restData,
      password: hashedPassword,
      roles: { set: roles },
    });

    userLogger.logMessage("User created.", {
      metaData: { user: userLoggerData(user) },
    });

    const { create: createMessage } = SHARED_MESSAGES.crud;

    const message = createMessage(USER_MESSAGES.crud.action(user));

    successfulResponse({ res, message, data: { user } });
  }

  async updateUser(req: UpdateUserReq, res: Response) {
    const { role, password, userToUpdate, ...restData } = pickUserCreateData(
      req
    ) as Partial<CreateUserReqBody> & { userToUpdate: User };

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

    const updatedUser = await userService.update(userToUpdate.id, data);

    const { user } = req.body;

    userLogger.logMessage("User updated.", {
      metaData: {
        oldUser: pickUserData(user),
        updatedUser: pickUserData(updatedUser),
      },
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    const message = updateMessage(USER_MESSAGES.crud.action(updatedUser));

    successfulResponse({ res, message, data: { user: updatedUser } });
  }

  async editProfile(req: EditProfileReq, res: Response) {
    const { user } = req.body;

    const data: Prisma.UserUpdateInput = pick(req.body, [
      "bio",
      "email",
      "fullName",
    ]);

    if (req.file != null) {
      data.avatarImage = req.file.path;
    }

    const [updatedUser] = await Promise.all([
      userService.update(user.id, data),
      ...(user.avatarImage != null ? [removeFile(user.avatarImage)] : []),
    ]);

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
