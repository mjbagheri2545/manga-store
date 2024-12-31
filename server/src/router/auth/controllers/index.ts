import { Response } from "express";

import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { registrationLogger } from "@/constants/loggers";
import AuthUserController from "@/controllers/auth_user.controller";
import { Req, UserAuthorizedReq } from "@/types";
import {
  generateJwtToken,
  hashPassword,
  pickUserData,
  withCatch,
} from "@/utils";

import MESSAGES from "../constants/messages";

type RegistrationReq = Req<{
  fullName: string;
  email: string;
  password: string;
  user: User;
}>;

type LoginReq = UserAuthorizedReq<{ password: string }>;

class Controller extends AuthUserController {
  async register(req: RegistrationReq, res: Response) {
    const { password } = req.body;

    const hashedPassword = await hashPassword(password);

    const { email, fullName } = req.body;

    const user = await this.SHARED_DB.user.create({
      email,
      fullName,
      password: hashedPassword,
    });
    req.body.user = user;

    registrationLogger.log(
      "info",
      `user with email: ${email}, fullName: ${fullName} successfully registered`
    );

    const sendEmailPromise = this.sendEmail({
      subject: "Successful Registration",
      templateOptions: { featureName: "auth", name: "registration" },
      templateVariables: {
        name: fullName,
      },
      isSendResponseNeed: false,
    })(req, res);

    // we don't need error, because i don't
    // want to force response failed
    // because of failed sending email
    // i just catch the error to prevent
    // internal server error
    await withCatch(sendEmailPromise);

    this.successfulResponse({
      res,
      code: this.STATUS_CODES.created,
      message: MESSAGES.registration(email),
    });
  }

  async login(req: LoginReq, res: Response) {
    const { user, password } = req.body;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return this.badRequest(res);
    }

    const token = await generateJwtToken(user.id);

    this.successfulResponse({
      res,
      message: MESSAGES.login,
      data: { token, user: pickUserData(user) },
    });
  }
}

export default Controller;
