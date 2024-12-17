import { Router } from "express";

import Controller from "../controllers";
import Validator from "../validators";

function createAuthRouter() {
  const authRouter = Router();

  const {
    PATH: { auth },
    register,
    login,
  } = new Controller();

  const { registrationValidation, loginValidation } = new Validator();

  authRouter.post(auth.registration, registrationValidation(), register);
  authRouter.post(auth.login, loginValidation(), login);

  return authRouter;
}

export default createAuthRouter;
