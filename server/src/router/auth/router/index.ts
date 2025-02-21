import { Router } from "express";

import { emailAuthorization } from "@/middlewares/features/auth_user.middleware";

import AUTH_PATH from "../constants/path";
import AuthController from "../controllers";
import AuthValidator from "../validators";

function createAuthRouter() {
  const router = Router();

  const { register, login } = new AuthController();

  const { registrationValidation, loginValidation } = new AuthValidator();

  router.post(AUTH_PATH.login, loginValidation(), emailAuthorization, login);
  router.post(AUTH_PATH.registration, registrationValidation(), register);

  return router;
}

export default createAuthRouter;
