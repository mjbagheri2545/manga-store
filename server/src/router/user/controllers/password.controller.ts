import { Response } from "express";

import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { IdentityVerificationReq, UserAuthorizedReq } from "@/types";
import { hashPassword } from "@/utils";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { identityVerification } from "../utils";
import Controller from ".";

type ResetReq = UserAuthorizedReq<{
  currentPassword: string;
  newPassword: string;
}>;

type RecoverReq = IdentityVerificationReq<{
  newPassword: string;
}>;

class PasswordController extends Controller {
  private async changePassword(
    res: Response,
    user: User,
    newPassword: string,
    isRecoverPassword: boolean
  ) {
    const { successful } = MESSAGES.account.password;

    const hashedNewPassword = await hashPassword(newPassword);

    await DB.user.account.updatePassword({
      id: user.id,
      newPassword: hashedNewPassword,
      currentPassword: user.password,
      isRecoverPassword,
    });

    this.successfulResponse({ res, message: successful });
  }

  private async checkPasswordsWithNewPassword(
    res: Response,
    user: User,
    newPassword: string
  ) {
    const { failedMessage } = MESSAGES.account.password;

    const passwordsToCheckWithNewPassword = [
      user.password,
      ...user.oldPasswords,
    ];

    for (const hashedPassword of passwordsToCheckWithNewPassword) {
      if (await bcrypt.compare(newPassword, hashedPassword)) {
        return this.badRequest(res, failedMessage);
      }
    }
  }

  async recover(req: RecoverReq, res: Response) {
    const { user, newPassword } = req.body;

    await this.checkPasswordsWithNewPassword(res, user, newPassword);
    if (res.headersSent) return;

    await identityVerification(req, res);
    if (res.headersSent) return;

    await this.changePassword(res, user, newPassword, true);
  }

  async reset(req: ResetReq, res: Response) {
    const { failedMessage } = MESSAGES.account.password;

    const { user, currentPassword, newPassword } = req.body;

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return this.badRequest(res, failedMessage);
    }

    await this.checkPasswordsWithNewPassword(res, user, newPassword);
    if (res.headersSent) return;
    await this.changePassword(res, user, newPassword, false);
  }
}

export default PasswordController;
