import { Router } from "express";

import multer from "multer";

import SHARED_MESSAGES from "@/constants/messages";
import {
  deleteEntity,
  fileSizeChecker,
  hasGeneralPermission,
  hasSpecificPermission,
  idAuthorization,
  jwtAuthorization,
} from "@/middlewares";
import { imageAuthorization } from "@/middlewares/features/user_product.middleware";
import { PermissionProduct } from "@/types";
import { getFilePathFromDbFilePath, removeFile } from "@/utils";
import { slugValidation } from "@/validators";

import {
  PERMISSION_PRODUCT_SELECT,
  PRODUCT_BASE_SELECT,
  ProductBase,
  productLogger,
} from "../constants/global";
import PRODUCT_PATH from "../constants/path";
import ProductMutationController from "../controllers/productMutation.controller";
import { hasProductPermission } from "../lib/permissions";
import productService, { GetProductByIdOptions } from "../services";
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

  const createPermission = hasGeneralPermission((user) =>
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

  const updatePermission = hasSpecificPermission<PermissionProduct>({
    entityKey: "product",
    hasPermission: (user, product) =>
      hasProductPermission(user, "update", product),
  });

  const createGetProductById = (options?: GetProductByIdOptions) =>
    idAuthorization({
      getByIdQuery: (id) => productService.getById(id, options),
      entityKey: "product",
    });

  router.put(
    "/:id",
    productImageUploader.single("productImage"),
    fileSizeChecker(PRODUCT_IMAGE_SIZE_LIMIT, "MB"),
    updateProductValidation(),
    jwtAuthorization,
    createGetProductById({
      select: {
        ...PRODUCT_BASE_SELECT,
        tags: { select: { id: true } },
      },
    }),
    updatePermission,
    imageAuthorization(),
    updateProduct
  );

  router.put(
    PRODUCT_PATH.rate,
    updateProductRatingValidation(),
    jwtAuthorization,
    createGetProductById(),
    updateProductRating
  );

  function deleteProductMessage(product: ProductBase) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;

    productLogger.logMessage("Product deleted.", {
      metaData: productLoggerData(product),
    });

    return deleteMessage("محصول");
  }

  async function deleteProductOperation(product: PermissionProduct) {
    return removeFile(getFilePathFromDbFilePath(product.productImage));
  }

  const deleteProduct = deleteEntity<ProductBase, PermissionProduct>({
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
    createGetProductById({ select: PERMISSION_PRODUCT_SELECT }),
    deleteProduct
  );

  return router;
}

export default createProductRouter;
