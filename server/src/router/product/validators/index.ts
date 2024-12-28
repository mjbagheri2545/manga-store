import slugify from "@/lib/slugify";
import ValidatorConfiguration from "@/validators/configuration.validator";

class ProductsMutationValidator extends ValidatorConfiguration {
  private getLabel(label: string) {
    return `${label} محصول`;
  }

  private ifExists(value: any) {
    return typeof value === "string" && value.length > 0;
  }

  private getCreateProductValidation() {
    return [
      this.minLength("name", { label: this.getLabel("نام") }),
      this.minLength("persianName", { label: this.getLabel("نام فارسی") }),
      this.minLength("designer", { label: this.getLabel("طراح") }),
      this.minLength("writer", { label: this.getLabel("نویسنده") }),
      this.required("summary", { label: this.getLabel("خلاصه داستان") }),
      this.required("managerId", { label: this.getLabel("مدیر") }),
      this.required("categoryId", { label: this.getLabel("دسته بندی") }),
      this.required("statusId", { label: this.getLabel("وضعیت") }),
    ];
  }

  createProductValidation() {
    const priceInRials = this.required("priceInRials", {
      label: this.getLabel("قیمت"),
    }).toInt();

    const releaseYear = this.required("releaseYear", {
      label: this.getLabel("سال انتشار"),
    }).toInt();

    const slug = this.required("slug", {
      label: this.getLabel("آدرس اینترنتی"),
    }).customSanitizer((slug) => slugify(slug));

    return this.createValidation([
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

    const priceInRials = this.required("priceInRials", {
      label: this.getLabel("قیمت"),
    })
      .optional()
      .if(this.ifExists)
      .toInt();
    const releaseYear = this.required("releaseYear", {
      label: this.getLabel("قیمت"),
    })
      .optional()
      .if(this.ifExists)
      .toDate();
    const slug = this.required("slug", {
      label: this.getLabel("آدرس اینترنتی"),
    })
      .optional()
      .if(this.ifExists)
      .customSanitizer((slug) => slugify(slug));

    return this.createValidation([
      ...optionalFields,
      this.slug(),
      priceInRials,
      releaseYear,
      slug,
    ]);
  }
}
export default ProductsMutationValidator;
