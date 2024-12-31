import { NextFunction, Response } from "express";

import SHARED_CONFIG from "@/constants/config";
import AuthUserController from "@/controllers/auth_user.controller";
import { EmptyObject, SendEmailReq, UserAuthorizedReq } from "@/types";
import { isExpired } from "@/utils";

import { generateVerificationToken, getEmailRemainingSeconds } from "../utils";

abstract class AccountController extends AuthUserController {
  async sendIdentityVerificationEmail(req: SendEmailReq, res: Response) {
    const { user } = req.body;
    const verificationCode = await generateVerificationToken(user.id);

    return this.sendEmail({
      subject: "Verify Identity",
      templateOptions: {
        featureName: "user",
        name: "identification",
      },
      templateVariables: {
        name: user.fullName,
        verificationCode,
        expirationMinutes: SHARED_CONFIG.time.identificationExpirationMinutes,
      },
    })(req, res);
  }

  emailTypeHandler(
    req: UserAuthorizedReq<EmptyObject>,
    res: Response,
    next: NextFunction
  ) {
    const {
      body: { user },
    } = req;

    if (
      user.emailRemainingTime != null &&
      !isExpired(user.emailRemainingTime)
    ) {
      const { alreadySent: alreadySentMessage } =
        this.SHARED_MESSAGES.general.sendEmail;

      const remainingTime = getEmailRemainingSeconds(user.emailRemainingTime);

      this.failedResponse({
        res,
        code: this.STATUS_CODES.tooEarly,
        message: alreadySentMessage(remainingTime),
      });
    }

    return next();
  }
}

export default AccountController;
