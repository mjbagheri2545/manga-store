import { Router } from "express";

import BASE_PATH from "@/constants/basePath";

import PATH from "../constants/path";
import ProductsMutationController from "../controllers/productsMutation.controller";
import { hasProductPermission } from "../lib/permissions";
import ProductsMutationValidator from "../validators/productsMutation.validator";
import createGetProductsRoutes from "./getProducts.routes";

function createProductRouter() {
  const router = Router();

  createGetProductsRoutes(router);

  const {
    permissionAuthorization,
    jwtAuthorization,
    deleteProduct,
    createProduct,
    updateProduct,
  } = new ProductsMutationController();

  const {
    deleteProductValidation,
    createProductValidation,
    updateProductValidation,
  } = new ProductsMutationValidator();

  router.post(
    PATH.index,
    jwtAuthorization,
    permissionAuthorization((user) => hasProductPermission(user, "create")),
    createProductValidation(),
    createProduct
  );

  router.put(
    BASE_PATH.id,
    jwtAuthorization,
    updateProductValidation(),
    updateProduct
  );

  router.delete(
    BASE_PATH.id,
    jwtAuthorization,
    deleteProductValidation(),
    deleteProduct
  );

  return router;
}

export default createProductRouter;
