import slugify from "@/lib/slugify";

import ValidatorConfiguration from "./configuration.validator";

class GroupingModelsValidator extends ValidatorConfiguration {
  createGroupModelValidation() {
    const slug = this.required("episode", {
      label: "آدرس اینترنتی ژانر",
    }).custom((slug) => slugify(slug));

    return this.createValidation([
      slug,
      this.required("name", { label: "نام ژانر" }),
    ]);
  }

  updateGroupModelValidation() {
    const slug = this.required("episode", {
      label: "آدرس اینترنتی ژانر",
    })
      .ifExists()
      .custom((slug) => slugify(slug));

    return this.createValidation([
      this.required("name", { label: "نام ژانر" }),
      slug,
      this.slug(),
    ]);
  }
}

export default GroupingModelsValidator;
