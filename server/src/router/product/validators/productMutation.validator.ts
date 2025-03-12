import slugify from "@/lib/slugify";
import { AutoBind } from "@/utils";
import {
  createValidation,
  customExpressValidator,
  isLength,
  required,
  slugValidator,
  uniquenessValidator,
} from "@/validators";

import PRODUCT_MESSAGES from "../constants/messages";
import productService from "../services";

const MAX_RELEASE_YEAR = 10000;

class ProductMutationValidator extends AutoBind {
  private getLabel(label: string) {
    return `${label} محصول`;
  }

  private getCreateProductValidation() {
    return [
      isLength("name", { label: this.getLabel("نام") }),
      isLength("persianName", { label: this.getLabel("نام فارسی") }),
      isLength("designer", { label: this.getLabel("طراح") }),
      isLength("writer", { label: this.getLabel("نویسنده") }),
      required("summary", { label: this.getLabel("خلاصه داستان") }),
      required("managerId", { label: this.getLabel("مدیر") }),
      required("categoryId", { label: this.getLabel("دسته بندی") }),
      required("statusId", { label: this.getLabel("وضعیت") }),
      required("priceInRials", { label: this.getLabel("قیمت") }),
      customExpressValidator
        .body("tagsId")
        .custom((tagsId) => Array.isArray(tagsId) && tagsId.length > 0)
        .withMessage(PRODUCT_MESSAGES.minTagsId),
    ];
  }

  createProductValidation() {
    const releaseYear = required("releaseYear", {
      label: this.getLabel("سال انتشار"),
    })
      .custom((releaseYear) => parseInt(releaseYear) < MAX_RELEASE_YEAR)
      .withMessage(PRODUCT_MESSAGES.maxReleaseYear);

    const slug = required("slug", {
      label: this.getLabel("آدرس اینترنتی"),
    })
      .customSanitizer((slug) => slugify(slug))
      .custom(uniquenessValidator(productService.getBySlug))
      .withMessage(PRODUCT_MESSAGES.alreadyExistsSlug);

    return createValidation([
      ...this.getCreateProductValidation(),
      releaseYear,
      slug,
    ]);
  }

  updateProductValidation() {
    const optionalFields = this.getCreateProductValidation().map(
      (validationChain) => validationChain.optional()
    );

    const releaseYear = required("releaseYear", {
      label: this.getLabel("سال انتشار"),
    })
      .optional()
      .ifExists()
      .custom((releaseYear) => parseInt(releaseYear) < MAX_RELEASE_YEAR)
      .withMessage(PRODUCT_MESSAGES.maxReleaseYear);

    const slug = required("slug", {
      label: this.getLabel("آدرس اینترنتی"),
    })
      .optional()
      .ifExists()
      .customSanitizer((slug) => slugify(slug))
      .custom(uniquenessValidator(productService.getBySlug))
      .withMessage(PRODUCT_MESSAGES.alreadyExistsSlug);

    return createValidation([
      ...optionalFields,
      slugValidator(),
      releaseYear,
      slug,
    ]);
  }

  updateProductRatingValidation() {
    const rating = required("rating", { label: "ریتینگ" }).customSanitizer(
      (rating) => parseInt(rating)
    );

    return createValidation([slugValidator("productId", "آیدی محصول"), rating]);
  }
}
export default ProductMutationValidator;
