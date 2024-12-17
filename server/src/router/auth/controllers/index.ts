import { Response } from "express";

import bcrypt from "bcrypt";

import { registrationLogger } from "@/constants/loggers";
import AuthUserController from "@/controllers/auth_user.controller";
import { Req, UserAuthorizedReq } from "@/types/req.type";
import { pick } from "@/utils";
import { hashPassword } from "@/utils/auth_user";
import { generateJwtToken } from "@/utils/auth_user/auth.util";

type RegistrationReq = Req<{
  fullName: string;
  email: string;
  password: string;
}>;

type LoginReq = UserAuthorizedReq<{ password: string }>;

class Controller extends AuthUserController {
  async register(req: RegistrationReq, res: Response) {
    const { created } = this.STATUS_CODES;
    const { registration } = this.MESSAGES.auth_user.auth;
    const { email, password, fullName } = req.body;

    const hashedPassword = await hashPassword(password);

    await this.DB.user.create({
      email,
      fullName,
      password: hashedPassword,
    });

    registrationLogger.log(
      "info",
      `user with email: ${email}, fullName: ${fullName} successfully registered`
    );

    this.successfulResponse({
      res,
      code: created,
      message: registration(email),
    });
  }

  async login(req: LoginReq, res: Response) {
    const { login } = this.MESSAGES.auth_user.auth;
    const { user, password } = req.body;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return this.badRequest(res);
    }

    const token = await generateJwtToken(user.id);

    const userData = pick(user, ["email", "id", "fullName", "roles"]);

    this.successfulResponse({
      res,
      message: login,
      data: { token, user: userData },
    });
  }
}

export default Controller;
