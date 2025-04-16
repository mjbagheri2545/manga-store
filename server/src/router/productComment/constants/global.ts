import { Prisma, ProductComment } from "@prisma/client";

import { createLogger } from "@/utils";

export const productCommentLogger = createLogger({
  fileName: "features/productComment",
});

export type ProductCommentBase = Pick<
  ProductComment,
  "id" | "message" | "createdAt" | "updatedAt"
>;
export const PRODUCT_COMMENT_BASE_SELECT: Prisma.ProductCommentSelect = {
  id: true,
  message: true,
  createdAt: true,
  updatedAt: true,
};

export const PERMISSION_PRODUCT_COMMENT_SELECT: Prisma.ProductCommentSelect = {
  id: true,
  authorId: true,
  product: { select: { managerId: true } },
};
