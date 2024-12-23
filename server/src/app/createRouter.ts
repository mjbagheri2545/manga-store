import { Router } from "express";

import BASE_PATH from "@/constants/basePath";
import createAuthRouter from "@/router/auth/router";
import createUserRouter from "@/router/user/router";

function createRouter() {
  const router = Router();

  router.use(BASE_PATH.auth, createAuthRouter());
  router.use(BASE_PATH.user, createUserRouter());
  return router;
}

export default createRouter;
