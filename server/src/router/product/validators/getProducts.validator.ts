import Validator from ".";

class GetProductsValidator extends Validator {
  productSlugValidation() {
    return this.createValidation([this.slug("productSlug", "محصول")]);
  }

  categoryValidation() {
    return this.createValidation([this.slug("category", "دسته بندی")]);
  }

  tagValidation() {
    return this.createValidation([this.slug("tag", "ژانر")]);
  }

  statusValidation() {
    return this.createValidation([this.slug("status", "وضعیت")]);
  }
}

export default GetProductsValidator;
