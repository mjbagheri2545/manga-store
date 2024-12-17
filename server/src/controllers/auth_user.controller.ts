import { NextFunction, Request, Response } from "express";

import HelperConfiguration from "@/helpers/configuration.helper";

abstract class AuthUserController extends HelperConfiguration {
  async emailAuthorization(req: Request, res: Response, next: NextFunction) {
    const user = await this.DB.user.getByEmail(req.body.email);

    if (user == null) {
      return this.badRequest(res, {
        isFullMessage: true,
        message: this.MESSAGES.auth_user.common.emailAuthorization,
      });
    }

    req.body.user = user;
    next();
  }
}

export default AuthUserController;
