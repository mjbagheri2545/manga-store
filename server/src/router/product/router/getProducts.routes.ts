import { Router } from "express";

import { jwtAuthorization } from "@/middlewares";
import { slugValidation } from "@/validators";

import PATH from "../constants/path";
import GetProductsController from "../controllers/getProducts.controller";

// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

function createGetProductsRoutes(router: Router) {
  const { getAll, getByProductSlug, getByCategory, getByTag, getByStatus } =
    new GetProductsController();

  router.get("/", jwtAuthorization, getAll);

  router.get(
    PATH.getByProductSlug,
    slugValidation("productSlug", "محصول مورد نظر"),
    jwtAuthorization,
    getByProductSlug
  );

  router.get(
    PATH.getByCategory,
    slugValidation("category", "دسته بندی مورد نظر"),
    jwtAuthorization,
    getByCategory
  );

  router.get(
    PATH.getByTag,
    slugValidation("tag", "ژانر مورد نظر"),
    jwtAuthorization,
    getByTag
  );
  router.get(
    PATH.getByStatus,
    slugValidation("status", "وضعیت مورد نظر"),
    jwtAuthorization,
    getByStatus
  );
}

export default createGetProductsRoutes;
