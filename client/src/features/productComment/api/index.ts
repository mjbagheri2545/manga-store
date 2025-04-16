import PATH from "@/constants/path";
import { GetAllRootProductCommentBase } from "@/contexts/ProductContext";
import { HTTP } from "@/lib/http";
import {
  PaginateQuery,
  PaginateQueryWithSort,
  ProductComment,
  TGetAllResponse,
  User,
} from "@/types";

import { ProductCommentData } from "../schemas";

export type ProductCommentResponse = { productComment: ProductComment };

type ProductCommentBaseOptions = {
  productId: string;
};

type GetAllProductCommentsOptions = ProductCommentBaseOptions & {
  query?: PaginateQueryWithSort;
};

type CreateProductCommentOptions = ProductCommentBaseOptions & {
  data: ProductCommentData;
};

type ReplyOptions = CreateProductCommentOptions & {
  parentId: string;
  replyToId: string;
};

type UpdateProductCommentOptions = CreateProductCommentOptions & {
  id: string;
};

export type GetAllRootProductCommentsResponse = TGetAllResponse<{
  rootProductComments: GetAllRootProductCommentBase[];
}>;

export type GetAllReplyBase = GetAllRootProductCommentBase & {
  parentId: string;
  replyTo: Pick<User, "fullName">;
};

export type GetAllRepliesResponse = TGetAllResponse<{
  replies: GetAllReplyBase[];
}>;

type GetAllRepliesOptions = ProductCommentBaseOptions & {
  parentId: string;
  query?: PaginateQuery;
};

export type ToggleLikeResponse = {
  addLike: boolean;
  deleteDislike?: boolean;
};

export type ToggleDislikeResponse = {
  addDislike: boolean;
  deleteLike?: boolean;
};

type ToggleOptions = {
  productId: string;
  id: string;
};

class ProductCommentApi {
  getAll({ query, productId }: GetAllProductCommentsOptions) {
    return HTTP.get<GetAllRootProductCommentsResponse>(
      PATH.productComment.api(productId),
      {
        params: query,
      }
    );
  }

  getAllReplies({ parentId, productId, query }: GetAllRepliesOptions) {
    return HTTP.get<GetAllRepliesResponse>(
      `${PATH.productComment.api(productId)}/${parentId}/replies`,
      { params: query }
    );
  }

  getById({ id, productId }: ProductCommentBaseOptions & { id: string }) {
    return HTTP.get<ProductCommentResponse>(
      `${PATH.productComment.api(productId)}/${id}`
    );
  }

  create({ data, productId }: CreateProductCommentOptions) {
    return HTTP.post<{ rootProductComment: GetAllRootProductCommentBase }>(
      PATH.productComment.api(productId),
      {
        data,
      }
    );
  }

  reply({ data, productId, parentId, replyToId }: ReplyOptions) {
    return HTTP.post<{ reply: GetAllReplyBase }>(
      `${PATH.productComment.api(productId)}/${parentId}/reply/${replyToId}`,
      {
        data,
      }
    );
  }

  update({ id, data, productId }: UpdateProductCommentOptions) {
    return HTTP.put<{ id: string }>(
      `${PATH.productComment.api(productId)}/${id}`,
      {
        data,
      }
    );
  }

  delete({ id, productId }: ProductCommentBaseOptions & { id: string }) {
    return HTTP.delete<{ id: string }>(
      `${PATH.productComment.api(productId)}/${id}`
    );
  }

  toggleLike({ id, productId }: ToggleOptions) {
    return HTTP.put<ToggleLikeResponse>(
      `${PATH.productComment.api(productId)}/${id}/toggle-like`
    );
  }

  toggleDislike({ id, productId }: ToggleOptions) {
    return HTTP.put<ToggleDislikeResponse>(
      `${PATH.productComment.api(productId)}/${id}/toggle-dislike`
    );
  }
}

const productCommentApi = new ProductCommentApi();

export default productCommentApi;
