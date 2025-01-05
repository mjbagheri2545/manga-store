import { Router } from "express";

import BASE_PATH from "@/constants/basePath";
import createAuthRouter from "@/router/auth/router";
import createProductRouter from "@/router/product/router";
import createUserRouter from "@/router/user/router";

const router = Router();

router.use(BASE_PATH.auth, createAuthRouter());
router.use(BASE_PATH.user, createUserRouter());
router.use(BASE_PATH.product, createProductRouter());

export default router;
