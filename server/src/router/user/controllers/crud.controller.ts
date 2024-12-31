import { Response } from "express";

import { $Enums, Prisma, User } from "@prisma/client";

import ControllerConfiguration from "@/controllers/configuration.controller";
import { EmptyObject, PaginateQuery, UserAuthorizedReq } from "@/types";
import { hashPassword, pick, pickUserData, removeFile } from "@/utils";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { hasUserPermission } from "../lib/permissions";
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

type DeleteUserReq = UserAuthorizedReq<{ userToDelete: User }>;

class CrudController extends ControllerConfiguration {
  getUser(req: UserAuthorizedReq, res: Response) {
    const { user } = req.body;

    this.successfulResponse({ res, data: { user: pickUserData(user) } });
  }

  async getAll(
    req: UserAuthorizedReq<EmptyObject, PaginateQuery>,
    res: Response
  ) {
    const users = await DB.user.getAll(req.query);

    this.successfulResponse({ res, data: { users } });
  }

  async createUser(req: CreateUserReq, res: Response) {
    const { role, password, ...restData } = pickUserCreateData(
      req
    ) as CreateUserReqBody;

    const roles: $Enums.Role[] = ["user", ...(role === "user" ? [] : [role])];

    const hashedPassword = await hashPassword(password);

    const user = await DB.user.create({
      ...restData,
      password: hashedPassword,
      roles: { set: roles },
    });

    const { create: createMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: createMessage(MESSAGES.crud.action(user.email, user.fullName)),
    });
  }

  async updateUser(req: UpdateUserReq, res: Response) {
    const { user, userToUpdate } = req.body;

    if (!hasUserPermission(user, "update", userToUpdate)) {
      return this.forbidden(res);
    }

    const { role, password, ...restData } = pickUserCreateData(
      req
    ) as Partial<CreateUserReqBody>;

    const data: Prisma.UserUpdateInput = restData;

    if (role != null && !userToUpdate.roles.includes(role)) {
      data.roles = { set: [...userToUpdate.roles, role] };
    }

    if (password != null) {
      const hashedPassword = await hashPassword(password);
      const isSamePassword =
        hashedPassword === userToUpdate.password ||
        user.oldPasswords.includes(hashedPassword);

      if (isSamePassword) {
        return this.badRequest(res, MESSAGES.crud.samePassword);
      }

      data.password = hashedPassword;
      data.oldPasswords = { push: userToUpdate.password };
    }

    const updatedUser = await DB.user.update(userToUpdate.id, data);

    const { update: updateMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: updateMessage(
        MESSAGES.crud.action(updatedUser.email, updatedUser.fullName)
      ),
    });
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

    await Promise.all([
      DB.user.update(user.id, data),
      ...(user.avatarImage != null ? [removeFile(user.avatarImage)] : []),
    ]);

    this.successfulResponse({
      res,
      message: MESSAGES.editProfile,
    });
  }

  async deleteUser(req: DeleteUserReq, res: Response) {
    const { user, userToDelete } = req.body;

    if (!hasUserPermission(user, "delete", userToDelete)) {
      return this.forbidden(res);
    }

    const deletedUser = await DB.user.delete(userToDelete.id);

    const { delete: deleteMessage } = this.SHARED_MESSAGES.features.crud;

    this.successfulResponse({
      res,
      message: deleteMessage(
        MESSAGES.crud.action(deletedUser.email, deletedUser.fullName)
      ),
    });
  }
}

export default CrudController;
