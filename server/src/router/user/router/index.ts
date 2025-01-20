import { Router } from "express";

import PATH from "../constants/path";
import createUserCrudRoutes from "./crud.routes";
import createUserAccountPasswordRouter from "./password.router";
import createUserAccountVerificationRouter from "./verification.router";

function createUserRouter() {
  const router = Router();

  createUserCrudRoutes(router);
  router.use(
    PATH.account.verification.base,
    createUserAccountVerificationRouter()
  );
  router.use(PATH.account.password.base, createUserAccountPasswordRouter());

  return router;
}

export default createUserRouter;
