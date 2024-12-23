import { NextFunction, Request, Response } from "express";

import ControllerConfiguration from "./configuration.controller";

abstract class AuthUserController extends ControllerConfiguration {
  async emailAuthorization(req: Request, res: Response, next: NextFunction) {
    const user = await this.SHARED_DB.user.getByEmail(req.body.email);

    if (user == null) {
      return this.badRequest(res, {
        isFullMessage: true,
        message: this.SHARED_MESSAGES.common.auth_user.emailAuthorization,
      });
    }

    req.body.user = user;
    next();
  }
}

export default AuthUserController;
