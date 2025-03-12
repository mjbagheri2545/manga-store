import { Product } from "@prisma/client";

const PRODUCT_MESSAGES = {
  updateRating: "نظر شما با موفقیت ثبت شد.",
  crud: (product: Product) => `محصول با اسم ${product.name}`,
  alreadyExistsSlug: (slug: string) =>
    `یک محصول با آدرس اینترنتی ${slug} موجود است. لطفا با یک آدرس اینترنتی دیگر امتحان کنید.`,
  minTagsId: "هر محصول باید حداقل شامل یک ژانر باشد",
  maxReleaseYear: "سال انتشار خیلی بزرگ است.",
} as const;

export default PRODUCT_MESSAGES;
