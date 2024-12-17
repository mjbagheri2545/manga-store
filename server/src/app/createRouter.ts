import { Router } from "express";

import PATH from "@/constants/path";
import createAuthRouter from "@/router/auth/router";

function createRouter() {
  const router = Router();

  router.use(PATH.base.auth, createAuthRouter());
  return router;
}

export default createRouter;
