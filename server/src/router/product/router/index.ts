import { Router } from "express";

import { Product } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  idAuthorization,
  imageAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { deleteEntity } from "@/middlewares/features/crud.middleware";
import { createUploader } from "@/utils";
import { slugValidation } from "@/validators";

import productLogger from "../constants/logger";
import PRODUCT_MESSAGES from "../constants/messages";
import ProductMutationController from "../controllers/productMutation.controller";
import { hasProductPermission } from "../lib/permissions";
import productService from "../services";
import { productLoggerData } from "../utils";
import ProductMutationValidator from "../validators/productMutation.validator";
import createGetProductsRoutes from "./getProducts.routes";

function createProductRouter() {
  const router = Router();

  createGetProductsRoutes(router);

  const productImageUploader = createUploader(
    "../../../../uploads/productImage/"
  );

  const { createProduct, updateProduct } = new ProductMutationController();

  const { createProductValidation, updateProductValidation } =
    new ProductMutationValidator();

  const createPermission = allResourcePermission((user) =>
    hasProductPermission(user, "create")
  );

  router.post(
    "/",
    createProductValidation(),
    jwtAuthorization,
    createPermission,
    productImageUploader.single("productImage"),
    imageAuthorization(),
    createProduct
  );

  const updatePermission = specificResourcePermission<Product>({
    entityKey: "product",
    hasPermission: (user, product) =>
      hasProductPermission(user, "update", product),
  });

  const getProductById = idAuthorization({
    entityKey: "product",
    getByIdQuery: productService.getById,
  });

  router.put(
    "/:id",
    updateProductValidation(),
    jwtAuthorization,
    getProductById,
    updatePermission,
    productImageUploader.single("productImage"),
    imageAuthorization(),
    updateProduct
  );

  function deleteProductMessage(product: Product) {
    const { delete: deleteMessage } = SHARED_MESSAGES.features.crud;
    productLogger.logMessage("Product deleted.", {
      metaData: { product: productLoggerData(product) },
    });

    return deleteMessage(PRODUCT_MESSAGES.crud(product));
  }

  const deleteProduct = deleteEntity({
    delete: productService.delete,
    entityKey: "product",
    hasPermission: (user, product) =>
      hasProductPermission(user, "delete", product),
    message: deleteProductMessage,
  });

  router.delete(
    "/:id",
    slugValidation(),
    jwtAuthorization,
    getProductById,
    deleteProduct
  );

  return router;
}

export default createProductRouter;
