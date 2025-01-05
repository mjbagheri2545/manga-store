import { Response } from "express";

import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import STATUS_CODES from "@/constants/statusCodes";
import { sharedUserService } from "@/services";
import { Req, UserAuthorizedReq } from "@/types";
import {
  badRequest,
  generateJwtToken,
  hashPassword,
  pickUserData,
  sendEmail,
  successfulResponse,
  withCatch,
} from "@/utils";

import authLogger from "../constants/logger";
import AUTH_MESSAGES from "../constants/messages";

type RegistrationReq = Req<{
  fullName: string;
  email: string;
  password: string;
  user: User;
}>;

type LoginReq = UserAuthorizedReq<{ password: string }>;

class Controller {
  async register(req: RegistrationReq, res: Response) {
    const { password } = req.body;

    const hashedPassword = await hashPassword(password);

    const { email, fullName } = req.body;

    const user = await sharedUserService.create({
      email,
      fullName,
      password: hashedPassword,
    });
    req.body.user = user;

    const sendEmailPromise = sendEmail({
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

    const userData = pickUserData(user);

    authLogger.info("Registration", userData);

    successfulResponse({
      res,
      code: STATUS_CODES.created,
      message: AUTH_MESSAGES.registration(email),
    });
  }

  async login(req: LoginReq, res: Response) {
    const { user, password } = req.body;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return badRequest(res);
    }

    const token = await generateJwtToken(user.id);

    authLogger.info("Login", {
      email: user.email,
      fullName: user.fullName,
    });

    successfulResponse({
      res,
      message: AUTH_MESSAGES.login,
      data: { token, user: pickUserData(user) },
    });
  }
}

export default Controller;
