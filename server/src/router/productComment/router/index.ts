import { Router } from "express";

import SHARED_MESSAGES from "@/constants/messages";
import {
  hasGeneralPermission,
  hasSpecificPermission,
  idAuthorization,
  jwtAuthorization,
} from "@/middlewares";
import { deleteEntity } from "@/middlewares/crud.middleware";
import { PermissionProductComment } from "@/types";
import {
  idValidations,
  productIdValidation,
} from "@/validators/chapter_productComment.validator";

import {
  PERMISSION_PRODUCT_COMMENT_SELECT,
  PRODUCT_COMMENT_BASE_SELECT,
  ProductCommentBase,
  productCommentLogger,
} from "../constants/global";
import PRODUCT_COMMENT_MESSAGES from "../constants/messages";
import ProductCommentController from "../controllers";
import { hasProductCommentPermission } from "../lib/permissions";
import productCommentService, {
  GetProductCommentByIdOptions,
} from "../services";
import { productCommentLoggerData } from "../utils";
import ProductCommentValidator from "../validators";

function createProductCommentRouter() {
  const router = Router({ mergeParams: true });

  const {
    getAllProductComments,
    getAllReplies,
    getProductComment,
    createProductComment,
    reply,
    updateProductComment,
    toggleLike,
    toggleDislike,
  } = new ProductCommentController();

  const {
    createProductCommentValidation,
    updateProductCommentValidation,
    getAllRepliesValidation,
    replyValidation,
  } = new ProductCommentValidator();

  router.get(
    "/",
    productIdValidation(),
    jwtAuthorization,
    getAllProductComments
  );

  router.get(
    "/:parentId/replies",
    getAllRepliesValidation(),
    jwtAuthorization,
    getAllReplies
  );

  const createGetProductCommentById = (
    options?: GetProductCommentByIdOptions
  ) =>
    idAuthorization({
      entityKey: "productComment",
      getByIdQuery: (id) => productCommentService.getById(id, options),
    });

  router.get(
    "/:id",
    idValidations("دیدگاه"),
    jwtAuthorization,
    createGetProductCommentById({
      select: PRODUCT_COMMENT_BASE_SELECT,
    }),
    getProductComment
  );

  const createPermission = hasGeneralPermission((user) =>
    hasProductCommentPermission(user, "create")
  );

  router.post(
    "/",
    createProductCommentValidation(),
    jwtAuthorization,
    createPermission,
    createProductComment
  );

  router.post(
    "/:parentId/reply/:replyToId",
    replyValidation(),
    jwtAuthorization,
    reply
  );

  const updatePermission = hasSpecificPermission<PermissionProductComment>({
    entityKey: "productComment",
    hasPermission: (user, productComment) =>
      hasProductCommentPermission(user, "update", productComment),
  });

  router.put(
    "/:id",
    updateProductCommentValidation(),
    jwtAuthorization,
    createGetProductCommentById({
      select: { id: true, message: true, createdAt: true, updatedAt: true },
    }),
    updatePermission,
    updateProductComment
  );

  router.put(
    "/:id/toggle-like",
    jwtAuthorization,
    createGetProductCommentById({ select: { id: true } }),
    toggleLike
  );

  router.put(
    "/:id/toggle-dislike",
    jwtAuthorization,
    createGetProductCommentById({ select: { id: true } }),
    toggleDislike
  );

  function deleteProductCommentMessage(productComment: ProductCommentBase) {
    const { delete: deleteMessage } = SHARED_MESSAGES.crud;
    productCommentLogger.logMessage("ProductComment deleted.", {
      metaData: productCommentLoggerData(productComment),
    });

    return deleteMessage(PRODUCT_COMMENT_MESSAGES.crud);
  }

  const deleteProductComment = deleteEntity<
    ProductCommentBase,
    PermissionProductComment
  >({
    delete: (id) => productCommentService.delete(id),
    entityKey: "productComment",
    hasPermission: (user, productComment) =>
      hasProductCommentPermission(user, "delete", productComment),
    message: deleteProductCommentMessage,
  });

  router.delete(
    "/:id",
    idValidations("دیدگاه"),
    jwtAuthorization,
    createGetProductCommentById({
      select: PERMISSION_PRODUCT_COMMENT_SELECT,
    }),
    deleteProductComment
  );

  return router;
}

export default createProductCommentRouter;
