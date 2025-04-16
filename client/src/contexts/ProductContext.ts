import { createContext } from "react";

import { useContextValue } from "@/hooks";
import {
  Chapter,
  Product,
  ProductComment,
  ProductGroup,
  TGetAllResponse,
  User,
} from "@/types";

export type RatingResponse = {
  rating: { averageRating: number; ratingsCount: number; myRating?: number };
};

export type GetAllTranslatorBase = {
  fullName: string;
  id: string;
  translatedChaptersCount: number;
};

export type GetAllTranslatorsResponse = TGetAllResponse<{
  translators: GetAllTranslatorBase[];
}>;

export type GetAllProductCommentBaseLike = {
  count: number;
  likedByMe: boolean;
};

export type GetAllProductCommentBaseDislike = {
  count: number;
  dislikedByMe: boolean;
};

export type GetAllRootProductCommentBase = ProductComment & {
  isEdited: boolean;
  like: GetAllProductCommentBaseLike;
  dislike: GetAllProductCommentBaseDislike;
  author: Pick<
    User,
    "id" | "email" | "fullName" | "avatarImage" | "isVerified"
  >;
  repliesCount: number;
};

export type ProductBySlug = Product & {
  chapters: Chapter[];
  category: ProductGroup;
  status: ProductGroup;
  tags: ProductGroup[];
  chaptersCount: number;
  views: number;
  comments: GetAllRootProductCommentBase[];
} & GetAllTranslatorsResponse &
  RatingResponse;

export const ProductContext = createContext<ProductBySlug | null>(null);

export function useProduct() {
  return useContextValue(ProductContext);
}
