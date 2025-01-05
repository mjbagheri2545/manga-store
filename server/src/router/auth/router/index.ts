import { Router } from "express";

import { emailAuthorization } from "@/middlewares";

import AUTH_PATH from "../constants/path";
import Controller from "../controllers";
import Validator from "../validators";

function createAuthRouter() {
  const router = Router();

  const { register, login } = new Controller();

  const { registrationValidation, loginValidation } = new Validator();

  router.post(AUTH_PATH.login, loginValidation(), emailAuthorization, login);
  router.post(AUTH_PATH.registration, registrationValidation(), register);
  return router;
}

export default createAuthRouter;
