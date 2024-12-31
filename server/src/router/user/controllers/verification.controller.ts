import { NextFunction, Response } from "express";

import { IdentityVerificationReq, UserAuthorizedReq } from "@/types";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { identityVerification } from "../utils";
import AccountController from "./account.controller";

class VerificationController extends AccountController {
  alreadyVerifiedChecker(
    req: UserAuthorizedReq,
    res: Response,
    next: NextFunction
  ) {
    const { alreadyVerified } = MESSAGES.account.verification;
    const { user } = req.body;

    if (user.isVerified) {
      return this.badRequest(res, {
        message: alreadyVerified,
        isFullMessage: true,
      });
    }

    next();
  }

  async verify(req: IdentityVerificationReq, res: Response) {
    await identityVerification(req, res);

    if (res.headersSent) return;

    const { user } = req.body;
    await DB.user.account.verify(user.id);

    const { successful: successfulMessage } = MESSAGES.account.verification;

    this.successfulResponse({ res, message: successfulMessage });
  }
}

export default VerificationController;
