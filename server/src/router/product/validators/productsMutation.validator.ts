import Validator from ".";

class ProductsMutationValidator extends Validator {
  private getLabel(label: string) {
    return `${label} محصول`;
  }

  private getCreateProductValidation() {
    return [
      this.minLength("name", { label: this.getLabel("نام") }),
      this.minLength("persianName", { label: this.getLabel("نام فارسی") }),
      this.minLength("designer", { label: this.getLabel("طراح") }),
      this.minLength("writer", { label: this.getLabel("نویسنده") }),
      this.required("summary", { label: this.getLabel("خلاصه داستان") }),
      this.required("slug", { label: this.getLabel("آدرس اینترنتی") }),
      this.required("managerId", { label: this.getLabel("مدیر") }),
      this.required("categoryId", { label: this.getLabel("دسته بندی") }),
      this.required("statusId", { label: this.getLabel("وضعیت") }),
      this.required("priceInRials", { label: this.getLabel("قیمت") }),
      this.required("releaseYear", { label: this.getLabel("سال انتشار") }),
    ];
  }

  createProductValidation() {
    return this.createValidation(this.getCreateProductValidation());
  }

  updateProductValidation() {
    const optionalFields = this.getCreateProductValidation().map(
      (validationChain) => validationChain.optional()
    );

    return this.createValidation(optionalFields);
  }

  deleteProductValidation() {
    return this.createValidation([this.slug("id", "محصولی با آیدی مورد نظر")]);
  }
}
export default ProductsMutationValidator;
