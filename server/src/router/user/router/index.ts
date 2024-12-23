import { Router } from "express";

import PATH from "../constants/path";
import Controller from "../controllers";
import createPasswordRouter from "./password.router";
import createVerificationRouter from "./verification.router";

function createUserRouter() {
  const router = Router();

  const { jwtAuthorization, getUser } = new Controller();

  router.get(PATH.getUser, jwtAuthorization, getUser);
  router.use(PATH.account.verification.base, createVerificationRouter());
  router.use(PATH.account.password.base, createPasswordRouter());

  return router;
}

export default createUserRouter;
