import { NextFunction, Response } from "express";

import { IdentityVerificationReq, UserAuthorizedReq } from "@/types";
import { badRequest, successfulResponse } from "@/utils";

import userLogger from "../constants/logger";
import USER_MESSAGES from "../constants/messages";
import userAccountService from "../services/account.db";
import { identityVerification, userLoggerData } from "../utils";

class VerificationController {
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

  async verify(req: IdentityVerificationReq, res: Response) {
    await identityVerification(req, res);

    if (res.headersSent) return;

    const { user } = req.body;
    await userAccountService.verify(user.id);

    userLogger.info("User account verification.", userLoggerData(user));

    const { successful: successfulMessage } =
      USER_MESSAGES.account.verification;

    successfulResponse({ res, message: successfulMessage });
  }
}

export default VerificationController;
