import { NextFunction, Response } from "express";

import SHARED_CONFIG from "@/constants/config";
import AuthUserController from "@/controllers/auth_user.controller";
import { EmptyObject, SendEmailReq, UserAuthorizedReq } from "@/types";
import { isExpired, pickUserData } from "@/utils";

import { generateVerificationToken, getEmailRemainingSeconds } from "../utils";

class Controller extends AuthUserController {
  getUser(req: UserAuthorizedReq, res: Response) {
    const { user } = req.body;

    this.successfulResponse({ res, data: { user: pickUserData(user) } });
  }

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
    const { tooEarly } = this.STATUS_CODES;
    const { alreadySent } = this.SHARED_MESSAGES.general.sendEmail;

    if (
      user.emailRemainingTime != null &&
      !isExpired(user.emailRemainingTime)
    ) {
      this.failedResponse({
        res,
        code: tooEarly,
        message: alreadySent(getEmailRemainingSeconds(user.emailRemainingTime)),
      });
    }

    return next();
  }
}

export default Controller;
