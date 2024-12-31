import { Router } from "express";

import PATH from "../constants/path";
import createUserCrudRoutes from "./crud.routes";
import createPasswordRouter from "./password.router";
import createVerificationRouter from "./verification.router";

function createUserRouter() {
  const router = Router();

  createUserCrudRoutes(router);
  router.use(PATH.account.verification.base, createVerificationRouter());
  router.use(PATH.account.password.base, createPasswordRouter());

  return router;
}

export default createUserRouter;
