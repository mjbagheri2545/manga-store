import { Product } from "@prisma/client";

const PRODUCT_MESSAGES = {
  updateRating: "نظر شما با موفقیت ثبت شد.",
  crud: (product: Product) => `محصول با اسم ${product.name}`,
} as const;

export default PRODUCT_MESSAGES;
