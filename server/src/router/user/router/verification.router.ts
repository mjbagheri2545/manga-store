import { Router } from "express";

import PATH from "../constants/path";
import VerificationController from "../controllers/verification.controller";
import VerificationValidator from "../validators/verification.validator";

function createVerificationRouter() {
  const router = Router();

  const {
    jwtAuthorization,
    sendIdentityVerificationEmail,
    emailTypeHandler,
    alreadyVerifiedChecker,
    verify,
  } = new VerificationController();

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
