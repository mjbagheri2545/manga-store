import { Router } from "express";

import SHARED_CONFIG from "@/constants/config";
import { createUploader } from "@/utils";

import ProductsMutationController from "../controllers/productsMutation.controller";
import DB from "../db";
import { hasProductPermission } from "../lib/permissions";
import Validator from "../validators";
import createGetProductsRoutes from "./getProducts.routes";

function createProductRouter() {
  const router = Router();

  createGetProductsRoutes(router);

  const productImageUploader = createUploader(
    "../../../../uploads/productImage/"
  );

  const {
    permissionAuthorization,
    fileAuthorization,
    jwtAuthorization,
    getById,
    deleteProduct,
    createProduct,
    updateProduct,
  } = new ProductsMutationController();

  const { slugValidation, createProductValidation, updateProductValidation } =
    new Validator();

  router.post(
    "/",
    createProductValidation(),
    jwtAuthorization,
    permissionAuthorization((user) => hasProductPermission(user, "create")),
    productImageUploader.single("productImage"),
    fileAuthorization(SHARED_CONFIG.mime.image),
    createProduct
  );

  router.put(
    "/:id",
    updateProductValidation(),
    jwtAuthorization,
    getById({
      entityName: "محصولی",
      entityKey: "product",
      getByIdQuery: DB.getById,
    }),
    productImageUploader.single("productImage"),
    fileAuthorization(SHARED_CONFIG.mime.image),
    updateProduct
  );

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getById({
      entityName: "محصولی",
      entityKey: "product",
      getByIdQuery: DB.getById,
    }),
    deleteProduct
  );

  return router;
}

export default createProductRouter;
