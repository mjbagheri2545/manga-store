import { Prisma } from "@prisma/client";

import { GET_ALL_PRODUCT_COMMENTS_SELECT } from "@/constants/global/features/product_productComment.global";
import { prisma } from "@/lib/prisma";
import { PaginateQuery, PaginateQueryWithSort } from "@/types";
import { paginate } from "@/utils";

import {
  PERMISSION_PRODUCT_COMMENT_SELECT,
  PRODUCT_COMMENT_BASE_SELECT,
} from "../constants/global";
import { parseProductCommentQuery } from "../utils";

export const GET_ALL_PRODUCT_COMMENT_REPLIES_SELECT = {
  ...GET_ALL_PRODUCT_COMMENTS_SELECT,
  parentId: true,
  replyTo: { select: { fullName: true } },
};

export type GetProductCommentByIdOptions = Omit<
  Prisma.ProductCommentFindUniqueArgs,
  "where"
>;

class ProductCommentService {
  getAll(productId: string, query: PaginateQueryWithSort) {
    return Promise.all([
      prisma.productComment.findMany({
        where: { productId, parentId: null },
        ...parseProductCommentQuery(query),
        select: GET_ALL_PRODUCT_COMMENTS_SELECT,
      }),
      prisma.productComment.count({ where: { productId, parentId: null } }),
    ]);
  }

  getAllReplies(parentId: string, query: PaginateQuery) {
    return Promise.all([
      prisma.productComment.findMany({
        where: { parentId },
        ...paginate(query),
        select: GET_ALL_PRODUCT_COMMENT_REPLIES_SELECT,
      }),
      prisma.productComment.count({ where: { parentId } }),
    ]);
  }

  getById(
    id: string,
    options: GetProductCommentByIdOptions = {
      select: { id: true },
    }
  ) {
    return prisma.productComment.findUnique({
      where: { id },
      ...options,
    });
  }

  create(options: Prisma.ProductCommentCreateArgs) {
    return prisma.productComment.create(options);
  }

  update(id: string, data: Prisma.ProductCommentUpdateInput = {}) {
    return prisma.productComment.update({
      where: { id },
      data,
      select: PRODUCT_COMMENT_BASE_SELECT,
    });
  }

  createLike(commentId: string, likedById: string) {
    return prisma.productCommentLike.create({
      data: { commentId, likedById },
    });
  }

  deleteLike(commentId: string, likedById: string) {
    return prisma.productCommentLike.delete({
      where: { likedById_commentId: { commentId, likedById } },
    });
  }

  createDislike(commentId: string, dislikedById: string) {
    return prisma.productCommentDislike.create({
      data: { commentId, dislikedById },
    });
  }

  deleteDislike(commentId: string, dislikedById: string) {
    return prisma.productCommentDislike.delete({
      where: { dislikedById_commentId: { commentId, dislikedById } },
    });
  }

  getUserLike(commentId: string, likedById: string) {
    return prisma.productCommentLike.findUnique({
      where: { likedById_commentId: { commentId, likedById } },
    });
  }

  getUserDislike(commentId: string, dislikedById: string) {
    return prisma.productCommentDislike.findUnique({
      where: { dislikedById_commentId: { commentId, dislikedById } },
    });
  }

  delete(id: string) {
    return prisma.productComment.delete({
      where: { id },
      select: PERMISSION_PRODUCT_COMMENT_SELECT,
    });
  }
}

const productCommentService = new ProductCommentService();

export default productCommentService;
