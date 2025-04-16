import { Prisma, Product } from "@prisma/client";

import { createLogger } from "@/utils";

export const productLogger = createLogger({
  fileName: "features/product",
});

export type ProductBase = Pick<
  Product,
  | "id"
  | "name"
  | "persianName"
  | "slug"
  | "designer"
  | "writer"
  | "releaseYear"
  | "summary"
  | "oneChapterPriceInToman"
  | "productImage"
  | "createdAt"
  | "managerId"
>;
export const PRODUCT_BASE_SELECT: Prisma.ProductSelect = {
  id: true,
  persianName: true,
  name: true,
  slug: true,
  designer: true,
  writer: true,
  releaseYear: true,
  summary: true,
  oneChapterPriceInToman: true,
  productImage: true,
  createdAt: true,
  managerId: true,
};

export const PERMISSION_PRODUCT_SELECT: Prisma.ProductSelect = {
  managerId: true,
  productImage: true,
};
