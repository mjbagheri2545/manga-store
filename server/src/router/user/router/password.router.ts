import { Router } from "express";

import PATH from "../constants/path";
import PasswordController from "../controllers/password.controller";
import PasswordValidator from "../validators/password.validator";

function createPasswordRouter() {
  const router = Router();

  const {
    jwtAuthorization,
    emailAuthorization,
    sendIdentityVerificationEmail,
    emailTypeHandler,
    reset,
    recover,
  } = new PasswordController();

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
