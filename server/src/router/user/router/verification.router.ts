import { Router } from "express";

import { jwtAuthorization } from "@/middlewares";

import USER_PATH from "../constants/path";
import UserAccountVerificationController from "../controllers/verification.controller";
import {
  emailTypeHandler,
  sendIdentityVerificationEmail,
} from "../middlewares";
import UserAccountVerificationValidator from "../validators/verification.validator";

function createUserAccountVerificationRouter() {
  const router = Router();

  const { alreadyVerifiedChecker, verifyAccount } =
    new UserAccountVerificationController();

  const { verifyValidation } = new UserAccountVerificationValidator();

  const { verification: verificationPath } = USER_PATH.account;

  router.post(
    verificationPath.getEmail,
    jwtAuthorization,
    alreadyVerifiedChecker,
    emailTypeHandler,
    sendIdentityVerificationEmail
  );
  router.put(
    verificationPath.verify,
    verifyValidation(),
    jwtAuthorization,
    verifyAccount
  );

  return router;
}

export default createUserAccountVerificationRouter;
