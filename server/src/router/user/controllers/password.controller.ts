import { Response } from "express";

import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { IdentityVerificationReq, UserAuthorizedReq } from "@/types";
import {
  AutoBind,
  badRequest,
  hashPassword,
  successfulResponse,
} from "@/utils";

import USER_MESSAGES from "../constants/messages";
import userAccountService from "../services/account.db";
import { identityVerification } from "../utils";

type ResetReq = UserAuthorizedReq<{
  currentPassword: string;
  newPassword: string;
}>;

type RecoverReq = IdentityVerificationReq<{
  newPassword: string;
}>;

class UserAccountPasswordController extends AutoBind {
  private async changePassword(
    res: Response,
    user: User,
    newPassword: string,
    isRecoverPassword: boolean
  ) {
    const hashedNewPassword = await hashPassword(newPassword);

    await userAccountService.updatePassword({
      id: user.id,
      newPassword: hashedNewPassword,
      currentPassword: user.password,
      isRecoverPassword,
    });

    const { successful: successfulMessage } = USER_MESSAGES.account.password;

    successfulResponse({ res, message: successfulMessage });
  }

  private async checkPasswordsWithNewPassword(
    res: Response,
    user: User,
    newPassword: string
  ) {
    const { failedMessage } = USER_MESSAGES.account.password;

    const passwordsToCheckWithNewPassword = [
      user.password,
      ...user.oldPasswords,
    ];

    for (const hashedPassword of passwordsToCheckWithNewPassword) {
      if (await bcrypt.compare(newPassword, hashedPassword)) {
        return badRequest(res, failedMessage);
      }
    }
  }

  async recoverPassword(req: RecoverReq, res: Response) {
    const { user, newPassword } = req.body;

    await this.checkPasswordsWithNewPassword(res, user, newPassword);
    if (res.headersSent) return;

    await identityVerification(req, res);
    if (res.headersSent) return;

    await this.changePassword(res, user, newPassword, true);
  }

  async resetPassword(req: ResetReq, res: Response) {
    const { failedMessage } = USER_MESSAGES.account.password;

    const { user, currentPassword, newPassword } = req.body;

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return badRequest(res, failedMessage);
    }

    await this.checkPasswordsWithNewPassword(res, user, newPassword);
    if (res.headersSent) return;
    await this.changePassword(res, user, newPassword, false);
  }
}

export default UserAccountPasswordController;
