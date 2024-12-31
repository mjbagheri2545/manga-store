import { NextFunction, Request, Response } from "express";

import ControllerConfiguration from "./configuration.controller";

abstract class AuthUserController extends ControllerConfiguration {
  async emailAuthorization(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const user = await this.SHARED_DB.user.getByEmail(email);

    if (user == null) {
      return this.notFound({ res, entityName: "کاربری", entityInfo: "ایمیل" });
    }

    req.body.user = user;
    next();
  }
}

export default AuthUserController;
