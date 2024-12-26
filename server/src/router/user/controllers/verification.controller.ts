import { NextFunction, Response } from "express";

import { IdentityVerificationReq, UserAuthorizedReq } from "@/types";

import MESSAGES from "../constants/messages";
import DB from "../db";
import { identityVerification } from "../utils";
import Controller from ".";

class VerificationController extends Controller {
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

    const { successful } = MESSAGES.account.verification;

    const { user } = req.body;
    await DB.user.account.verify(user.id);

    this.successfulResponse({ res, message: successful });
  }
}

export default VerificationController;
