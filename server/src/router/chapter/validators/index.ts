import { AutoBind } from "@/utils";
import { createValidation, required } from "@/validators";
import {
  idValidators,
  productIdValidator,
} from "@/validators/chapter_productComment.validator";

class ChapterValidator extends AutoBind {
  private getCreateChapterValidation() {
    return [
      required("translatorId", { label: "مترجم" }),
      required("episode", { label: "قسمت فصل" }),
    ];
  }

  createChapterValidation() {
    return createValidation([
      ...this.getCreateChapterValidation(),
      productIdValidator(),
    ]);
  }

  updateChapterValidation() {
    const optionalFields = this.getCreateChapterValidation().map(
      (validationChain) => validationChain.optional()
    );

    return createValidation([...optionalFields, ...idValidators("فصل")]);
  }
}

export default ChapterValidator;
