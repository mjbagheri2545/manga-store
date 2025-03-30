import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { Chapter, Product, ProductGroup, TGetAllResponse } from "@/types";

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

export type ProductBySlug = Product & {
  chapters: Chapter[];
  category: ProductGroup;
  status: ProductGroup;
  tags: ProductGroup[];
  chaptersCount: number;
} & GetAllTranslatorsResponse &
  RatingResponse;

export type TProductContext = {
  product: ProductBySlug;
};

export const ProductContext = createContext<TProductContext | null>(null);

export function useProduct() {
  return useContextValue(ProductContext);
}
