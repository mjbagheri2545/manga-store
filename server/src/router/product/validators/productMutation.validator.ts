import slugify from "@/lib/slugify";
import { AutoBind } from "@/utils";
import {
  createValidation,
  isLength,
  required,
  slugValidator,
  uniquenessValidator,
} from "@/validators";

import PRODUCT_MESSAGES from "../constants/messages";
import productService from "../services";

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
    ];
  }

  createProductValidation() {
    const priceInRials = required("priceInRials", {
      label: this.getLabel("قیمت"),
    }).toInt();

    const releaseYear = required("releaseYear", {
      label: this.getLabel("سال انتشار"),
    }).toInt();

    const slug = required("slug", {
      label: this.getLabel("آدرس اینترنتی"),
    })
      .customSanitizer((slug) => slugify(slug))
      .custom(uniquenessValidator(productService.getBySlug))
      .withMessage(PRODUCT_MESSAGES.alreadyExistsSlug);

    return createValidation([
      ...this.getCreateProductValidation(),
      priceInRials,
      releaseYear,
      slug,
    ]);
  }

  updateProductValidation() {
    const optionalFields = this.getCreateProductValidation().map(
      (validationChain) => validationChain.optional()
    );

    const priceInRials = required("priceInRials", {
      label: this.getLabel("قیمت"),
    })
      .optional()
      .ifExists()
      .toInt();
    const releaseYear = required("releaseYear", {
      label: this.getLabel("قیمت"),
    })
      .optional()
      .ifExists()
      .toDate();
    const slug = required("slug", {
      label: this.getLabel("آدرس اینترنتی"),
    })
      .optional()
      .ifExists()
      .customSanitizer((slug) => slugify(slug));

    return createValidation([
      ...optionalFields,
      slugValidator(),
      priceInRials,
      releaseYear,
      slug,
    ]);
  }
}
export default ProductMutationValidator;
