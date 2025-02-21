import { Router } from "express";

import { jwtAuthorization } from "@/middlewares";
import { emailAuthorization } from "@/middlewares/features/auth_user.middleware";

import USER_PATH from "../constants/path";
import UserAccountPasswordController from "../controllers/password.controller";
import {
  emailTypeHandler,
  sendIdentityVerificationEmail,
} from "../middlewares";
import UserAccountPasswordValidator from "../validators/password.validator";

function createUserAccountPasswordRouter() {
  const router = Router();

  const { resetPassword, recoverPassword } =
    new UserAccountPasswordController();

  const { getEmailValidation, recoverValidation, resetValidation } =
    new UserAccountPasswordValidator();

  const { password: passwordPath } = USER_PATH.account;

  router.post(
    passwordPath.recovery.getEmail,
    getEmailValidation(),
    emailAuthorization,
    emailTypeHandler,
    sendIdentityVerificationEmail
  );
  router.put(
    passwordPath.recovery.recover,
    recoverValidation(),
    emailAuthorization,
    recoverPassword
  );

  router.put(
    passwordPath.reset,
    resetValidation(),
    jwtAuthorization,
    resetPassword
  );

  return router;
}

export default createUserAccountPasswordRouter;
