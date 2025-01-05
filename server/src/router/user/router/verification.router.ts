import { Router } from "express";

import { jwtAuthorization } from "@/middlewares";

import PATH from "../constants/path";
import VerificationController from "../controllers/verification.controller";
import {
  emailTypeHandler,
  sendIdentityVerificationEmail,
} from "../middlewares";
import VerificationValidator from "../validators/verification.validator";

function createVerificationRouter() {
  const router = Router();

  const { alreadyVerifiedChecker, verify } = new VerificationController();

  const { verifyValidation } = new VerificationValidator();

  const { verification } = PATH.account;

  router.post(
    verification.getEmail,
    jwtAuthorization,
    alreadyVerifiedChecker,
    emailTypeHandler,
    sendIdentityVerificationEmail
  );
  router.put(verification.verify, verifyValidation(), jwtAuthorization, verify);

  return router;
}

export default createVerificationRouter;
