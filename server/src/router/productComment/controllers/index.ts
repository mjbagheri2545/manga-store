import { Response } from "express";

import { GET_ALL_PRODUCT_COMMENTS_SELECT } from "@/constants/global/features/product_productComment.global";
import SHARED_MESSAGES from "@/constants/messages";
import {
  EmptyObject,
  PaginateQuery,
  PaginateQueryWithSort,
  UserAuthorizedReq,
} from "@/types";
import { successfulResponse } from "@/utils";
import {
  mapOneProductComment,
  mapProductComments,
  ProductCommentToMap,
} from "@/utils/features/product_productComment.util";

import { ProductCommentBase, productCommentLogger } from "../constants/global";
import PRODUCT_COMMENT_MESSAGES from "../constants/messages";
import productCommentService, {
  GET_ALL_PRODUCT_COMMENT_REPLIES_SELECT,
} from "../services";
import { productCommentLoggerData } from "../utils";

type GetAllProductCommentsReq = UserAuthorizedReq<
  EmptyObject,
  PaginateQueryWithSort,
  { productId: string }
>;

type GetAllProductCommentRepliesReq = UserAuthorizedReq<
  EmptyObject,
  PaginateQuery,
  { parentId: string }
>;

type GetProductCommentReq = UserAuthorizedReq<{
  productComment: ProductCommentBase;
}>;

type ToggleLikeDislikeReq = UserAuthorizedReq<{
  productComment: { id: string };
}>;

type CreateProductCommentReqBody = {
  message: string;
};
type CreateProductCommentReq = UserAuthorizedReq<
  CreateProductCommentReqBody,
  EmptyObject,
  { productId: string }
>;

type ReplyReq = UserAuthorizedReq<
  CreateProductCommentReqBody,
  EmptyObject,
  { productId: string; parentId: string; replyToId: string }
>;

type UpdateProductCommentReqBody = CreateProductCommentReqBody & {
  productComment: ProductCommentBase;
};
type UpdateProductCommentReq = UserAuthorizedReq<UpdateProductCommentReqBody>;

class ProductCommentController {
  async getAllProductComments(req: GetAllProductCommentsReq, res: Response) {
    const {
      params: { productId },
      query,
      body: { user },
    } = req;

    const [rootProductComments, count] = await productCommentService.getAll(
      productId,
      query
    );

    const finalRootProductComments = mapProductComments(
      rootProductComments,
      user
    );

    successfulResponse({
      res,
      data: { rootProductComments: finalRootProductComments, count },
    });
  }

  async getAllReplies(req: GetAllProductCommentRepliesReq, res: Response) {
    const {
      params: { parentId },
      query,
      body: { user },
    } = req;

    const [replies, count] = await productCommentService.getAllReplies(
      parentId,
      query
    );

    const finalReplies = mapProductComments(replies, user);

    successfulResponse({
      res,
      data: { replies: finalReplies, count },
    });
  }

  getProductComment(req: GetProductCommentReq, res: Response) {
    const { productComment } = req.body;

    successfulResponse({ res, data: { productComment } });
  }

  async createProductComment(req: CreateProductCommentReq, res: Response) {
    const {
      params: { productId },
      body: { user, message },
    } = req;

    // i don't know why type does not infer
    const rootProductComment = (await productCommentService.create({
      data: {
        message,
        authorId: user.id,
        productId,
      },
      select: GET_ALL_PRODUCT_COMMENTS_SELECT,
    })) as unknown as ProductCommentToMap;

    productCommentLogger.logMessage("ProductComment created.", {
      metaData: productCommentLoggerData(rootProductComment),
    });

    successfulResponse({
      res,
      message: PRODUCT_COMMENT_MESSAGES.create,
      data: {
        rootProductComment: mapOneProductComment(rootProductComment, user),
      },
    });
  }

  async reply(req: ReplyReq, res: Response) {
    const {
      body: { user, message },
      params: { parentId, productId, replyToId },
    } = req;

    const reply = (await productCommentService.create({
      data: {
        message,
        authorId: user.id,
        productId,
        parentId,
        replyToId,
      },
      select: GET_ALL_PRODUCT_COMMENT_REPLIES_SELECT,
    })) as unknown as ProductCommentToMap & {
      parentId: string;
      replyTo: { email: string };
    };

    productCommentLogger.logMessage("ProductComment replied.", {
      metaData: { ...productCommentLoggerData(reply), parentId, replyToId },
    });

    successfulResponse({
      res,
      message: PRODUCT_COMMENT_MESSAGES.reply,
      data: { reply: mapOneProductComment(reply, user) },
    });
  }

  async updateProductComment(req: UpdateProductCommentReq, res: Response) {
    const { productComment, message } = req.body;

    const updatedProductComment = await productCommentService.update(
      productComment.id,
      { message }
    );

    productCommentLogger.logMessage("ProductComment updated.", {
      metaData: {
        old: productCommentLoggerData(productComment),
        new: productCommentLoggerData(updatedProductComment),
      },
    });

    const { update: updateMessage } = SHARED_MESSAGES.crud;

    const updatedMessage = updateMessage(PRODUCT_COMMENT_MESSAGES.crud);

    successfulResponse({
      res,
      message: updatedMessage,
      data: { id: updatedProductComment.id },
    });
  }

  async toggleLike(req: ToggleLikeDislikeReq, res: Response) {
    const { productComment, user } = req.body;

    const currentUserLike = await productCommentService.getUserLike(
      productComment.id,
      user.id
    );

    const data: Record<string, boolean> = {
      addLike: true,
    };

    if (currentUserLike != null) {
      await productCommentService.deleteLike(productComment.id, user.id);
      data.addLike = false;
    } else {
      const currentUserDislike = await productCommentService.getUserDislike(
        productComment.id,
        user.id
      );

      const createLikePromise = productCommentService.createLike(
        productComment.id,
        user.id
      );

      if (currentUserDislike != null) {
        await Promise.all([
          createLikePromise,
          productCommentService.deleteDislike(productComment.id, user.id),
        ]);
        data.deleteDislike = true;
      } else {
        await createLikePromise;
      }
    }

    successfulResponse({ res, data });
  }

  async toggleDislike(req: ToggleLikeDislikeReq, res: Response) {
    const { productComment, user } = req.body;

    const currentUserDislike = await productCommentService.getUserDislike(
      productComment.id,
      user.id
    );

    const data: Record<string, boolean> = {
      addDislike: true,
    };

    if (currentUserDislike != null) {
      await productCommentService.deleteDislike(productComment.id, user.id);
      data.addDislike = false;
    } else {
      const currentUserLike = await productCommentService.getUserLike(
        productComment.id,
        user.id
      );

      const createDislikePromise = productCommentService.createDislike(
        productComment.id,
        user.id
      );

      if (currentUserLike != null) {
        await Promise.all([
          createDislikePromise,
          productCommentService.deleteLike(productComment.id, user.id),
        ]);
        data.deleteLike = true;
      } else {
        await createDislikePromise;
      }
    }

    successfulResponse({ res, data });
  }
}

export default ProductCommentController;
