import { Router } from "express";

import { emailAuthorization, jwtAuthorization } from "@/middlewares";

import PATH from "../constants/path";
import PasswordController from "../controllers/password.controller";
import {
  emailTypeHandler,
  sendIdentityVerificationEmail,
} from "../middlewares";
import PasswordValidator from "../validators/password.validator";

function createPasswordRouter() {
  const router = Router();

  const { reset, recover } = new PasswordController();

  const { getEmailValidation, recoverValidation, resetValidation } =
    new PasswordValidator();

  const { password } = PATH.account;

  router.post(
    password.recovery.getEmail,
    getEmailValidation(),
    emailAuthorization,
    emailTypeHandler,
    sendIdentityVerificationEmail
  );
  router.put(
    password.recovery.recover,
    recoverValidation(),
    emailAuthorization,
    recover
  );

  router.put(password.reset, resetValidation(), jwtAuthorization, reset);

  return router;
}

export default createPasswordRouter;
