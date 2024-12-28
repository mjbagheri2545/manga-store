import { Router } from "express";

import { createUploader } from "@/utils";

import MESSAGES from "../constants/messages";
import ProductsMutationController from "../controllers/productsMutation.controller";
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
    deleteProduct,
    createProduct,
    updateProduct,
  } = new ProductsMutationController();

  const { slugValidation, createProductValidation, updateProductValidation } =
    new Validator();

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
    "image/gif",
  ];

  router.post(
    "/",
    createProductValidation(),
    jwtAuthorization,
    permissionAuthorization((user) => hasProductPermission(user, "create")),
    productImageUploader.single("productImage"),
    fileAuthorization(allowedTypes, MESSAGES.invalidProductImage),
    createProduct
  );

  router.put(
    "/:id",
    updateProductValidation(),
    jwtAuthorization,
    productImageUploader.single("productImage"),
    fileAuthorization(allowedTypes, MESSAGES.invalidProductImage),
    updateProduct
  );

  router.delete("/:id", slugValidation(), jwtAuthorization, deleteProduct);

  return router;
}

export default createProductRouter;
