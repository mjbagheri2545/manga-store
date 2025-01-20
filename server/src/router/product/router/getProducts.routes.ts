import { Router } from "express";

import { jwtAuthorization } from "@/middlewares";
import { slugValidation } from "@/validators";

import PRODUCT_PATH from "../constants/path";
import GetProductController from "../controllers/getProduct.controller";

// we can't use router.use for this routes because these routes
// does not have a same parent path to group these routes like below path
// /account/password/recovery/get-email
// /account/password/recovery

function createGetProductsRoutes(router: Router) {
  const {
    getAllProducts,
    getProductByProductSlug,
    getProductsByCategory,
    getProductsByTag,
    getProductsByStatus,
  } = new GetProductController();

  router.get("/", jwtAuthorization, getAllProducts);

  router.get(
    PRODUCT_PATH.getByProductSlug,
    slugValidation("productSlug", "محصول مورد نظر"),
    jwtAuthorization,
    getProductByProductSlug
  );

  router.get(
    PRODUCT_PATH.getByCategory,
    slugValidation("category", "دسته بندی مورد نظر"),
    jwtAuthorization,
    getProductsByCategory
  );

  router.get(
    PRODUCT_PATH.getByTag,
    slugValidation("tag", "ژانر مورد نظر"),
    jwtAuthorization,
    getProductsByTag
  );
  router.get(
    PRODUCT_PATH.getByStatus,
    slugValidation("status", "وضعیت مورد نظر"),
    jwtAuthorization,
    getProductsByStatus
  );
}

export default createGetProductsRoutes;
