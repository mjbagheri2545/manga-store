import { z } from "zod";

import SHARED_MESSAGES from "@/constants/messages";
import {
  minLength,
  minMaxLength,
  minMaxNumber,
  minNumber,
  required,
  slugValidator,
  string,
} from "@/validators";
import { imageValidator } from "@/validators/user_product.validator";

import PRODUCT_MESSAGES from "../constants/messages";

// plus + 1 because of upcoming products
const MAX_RELEASE_YEAR = new Date().getFullYear() + 1;
const MIN_RELEASE_YEAR = 1900;

export const MAX_SUMMARY_LENGTH = 1000;

export const createProductSchema = z.object({
  name: minLength({ label: "اسم" }),
  persianName: minLength({ label: "اسم فارسی" }),
  designer: minLength({ label: "طراح" }),
  writer: minLength({ label: "نویسنده" }),
  releaseYear: minMaxNumber({
    label: "سال انتشار",
    max: MAX_RELEASE_YEAR,
    min: MIN_RELEASE_YEAR,
  }),
  summary: minMaxLength({ label: "خلاصه داستان", max: MAX_SUMMARY_LENGTH }),
  oneChapterPriceInToman: minNumber({ label: "قیمت هر فصل" }),
  slug: slugValidator(),
  statusId: required({ label: "وضعیت محصول" }),
  categoryId: required({ label: "دسته بندی" }),
  managerId: required({ label: "مدیر محصول" }),
  tagsId: string().array().min(1, PRODUCT_MESSAGES.minTagsId),
  productImage: imageValidator("تصویر محصول").refine((file) => file.size > 0, {
    message: SHARED_MESSAGES.validation.tooSmallFileSize("تصویر محصول"),
  }),
});

export type CreateProductData = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial({
  productImage: true,
});
