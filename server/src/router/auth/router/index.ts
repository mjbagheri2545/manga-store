import { Router } from "express";

import PATH from "../constants/path";
import Controller from "../controllers";
import Validator from "../validators";

function createAuthRouter() {
  const router = Router();

  const { register, login, emailAuthorization } = new Controller();

  const { registrationValidation, loginValidation } = new Validator();

  router.post(PATH.registration, registrationValidation(), register);
  router.post(PATH.login, loginValidation(), emailAuthorization, login);

  return router;
}

export default createAuthRouter;
