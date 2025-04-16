import { Router } from "express";

import BASE_PATH from "@/constants/basePath";
import createAuthRouter from "@/router/auth/router";
import createCategoryRouter from "@/router/category/router";
import createChapterRouter from "@/router/chapter/router";
import createProductRouter from "@/router/product/router";
import createProductCommentRouter from "@/router/productComment/router";
import createProductStatusRouter from "@/router/productStatus/router";
import createTagRouter from "@/router/tag/router";
import createUserRouter from "@/router/user/router";

import logClientError from "./logClientErrors";

function createRouter() {
  const router = Router();

  router.use(BASE_PATH.auth, createAuthRouter());
  router.use(BASE_PATH.user, createUserRouter());
  router.use(BASE_PATH.product, createProductRouter());
  router.use(BASE_PATH.chapter, createChapterRouter());
  router.use(BASE_PATH.category, createCategoryRouter());
  router.use(BASE_PATH.tag, createTagRouter());
  router.use(BASE_PATH.productStatus, createProductStatusRouter());
  router.use(BASE_PATH.productComment, createProductCommentRouter());
  router.post("/log-client-error", logClientError);

  return router;
}

export default createRouter;
