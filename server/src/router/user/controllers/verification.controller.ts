import { NextFunction, Response } from "express";

import { IdentityVerificationReq, UserAuthorizedReq } from "@/types";
import { badRequest, successfulResponse } from "@/utils";
import { userLoggerData } from "@/utils/features/auth_user.util";

import userLogger from "../constants/logger";
import USER_MESSAGES from "../constants/messages";
import userAccountService from "../services/account.service";
import { identityVerification } from "../utils";

class UserAccountVerificationController {
  alreadyVerifiedChecker(
    req: UserAuthorizedReq,
    res: Response,
    next: NextFunction
  ) {
    const { alreadyVerified: alreadyVerifiedMessage } =
      USER_MESSAGES.account.verification;
    const { user } = req.body;

    if (user.isVerified) {
      return badRequest(res, {
        message: alreadyVerifiedMessage,
        isFullMessage: true,
      });
    }

    next();
  }

  async verifyAccount(req: IdentityVerificationReq, res: Response) {
    await identityVerification(req, res);

    if (res.headersSent) return;

    const { user } = req.body;
    await userAccountService.verify(user.id);

    userLogger.logMessage("User account verification.", {
      metaData: { user: userLoggerData(user) },
    });

    const { successful: successfulMessage } =
      USER_MESSAGES.account.verification;

    successfulResponse({ res, message: successfulMessage });
  }
}

export default UserAccountVerificationController;
