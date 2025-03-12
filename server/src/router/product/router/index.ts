import { Router } from "express";

import multer from "multer";
import { Product } from "@prisma/client";

import SHARED_MESSAGES from "@/constants/messages";
import {
  allResourcePermission,
  deleteEntity,
  fileSizeChecker,
  idAuthorization,
  jwtAuthorization,
  specificResourcePermission,
} from "@/middlewares";
import { imageAuthorization } from "@/middlewares/features/user_product.middleware";
import { removeFile } from "@/utils";
import { slugValidation } from "@/validators";

import productLogger from "../constants/logger";
import PRODUCT_MESSAGES from "../constants/messages";
import PRODUCT_PATH from "../constants/path";
import ProductMutationController from "../controllers/productMutation.controller";
import { hasProductPermission } from "../lib/permissions";
import productService from "../services";
import { productLoggerData } from "../utils";
import ProductMutationValidator from "../validators/productMutation.validator";
import createGetProductsRoutes from "./getProducts.routes";

// 20 MB
const PRODUCT_IMAGE_SIZE_LIMIT = 20 * 1024 * 1024;

function createProductRouter() {
  const router = Router();

  createGetProductsRoutes(router);

  const productImageUploader = multer({
    storage: multer.memoryStorage(),
    limits: { files: 1, fileSize: PRODUCT_IMAGE_SIZE_LIMIT },
  });

  const { createProduct, updateProduct, updateProductRating } =
    new ProductMutationController();

  const {
    createProductValidation,
    updateProductValidation,
    updateProductRatingValidation,
  } = new ProductMutationValidator();

  const createPermission = allResourcePermission((user) =>
    hasProductPermission(user, "create")
  );

  router.post(
    "/",
    productImageUploader.single("productImage"),
    fileSizeChecker(PRODUCT_IMAGE_SIZE_LIMIT, "MB"),
    createProductValidation(),
    jwtAuthorization,
    createPermission,
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
    productImageUploader.single("productImage"),
    fileSizeChecker(PRODUCT_IMAGE_SIZE_LIMIT, "MB"),
    updateProductValidation(),
    jwtAuthorization,
    getProductById,
    updatePermission,
    imageAuthorization(),
    updateProduct
  );

  router.put(
    PRODUCT_PATH.updateRating,
    updateProductRatingValidation,
    jwtAuthorization,
    getProductById,
    updateProductRating
  );

  function deleteProductMessage(product: Product) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;

    productLogger.logMessage("Product deleted.", {
      metaData: { product: productLoggerData(product) },
    });

    return deleteMessage(PRODUCT_MESSAGES.crud(product));
  }

  async function deleteProductOperation(product: Product) {
    return removeFile(`public/${product.productImage}`);
  }

  const deleteProduct = deleteEntity({
    delete: productService.delete,
    operation: deleteProductOperation,
    failedOperationMessage: "حذف محصول",
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
