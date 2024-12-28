import ValidatorConfiguration from "@/validators/configuration.validator";

class Validator extends ValidatorConfiguration {
  private getCreateChapterValidation() {
    return [
      this.required("productId", { location: "params", label: "محصول" }),
      this.required("translatorId", { location: "params", label: "مترجم" }),
    ];
  }
  createChapterValidation() {
    const episode = this.required("episode", { label: "قسمت فصل" }).toInt();

    return this.createValidation([
      ...this.getCreateChapterValidation(),
      episode,
    ]);
  }

  updateChapterValidation() {
    const optionalFields = this.getCreateChapterValidation().map(
      (validationChain) => validationChain.optional()
    );

    const episode = this.required("episode", { label: "قسمت فصل" })
      .optional()
      .if((value) => typeof value === "string" && value.length > 0)
      .toInt();

    return this.createValidation([...optionalFields, episode, this.slug()]);
  }
}

export default Validator;
