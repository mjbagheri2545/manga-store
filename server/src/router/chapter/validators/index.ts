import { AutoBind } from "@/utils";
import { createValidation, required, slugValidator } from "@/validators";

class ChapterValidator extends AutoBind {
  private getCreateChapterValidation() {
    return [
      required("productId", { label: "محصول" }),
      required("translatorId", { label: "مترجم" }),
    ];
  }

  createChapterValidation() {
    const episode = required("episode", { label: "قسمت فصل" }).toInt();

    return createValidation([...this.getCreateChapterValidation(), episode]);
  }

  updateChapterValidation() {
    const optionalFields = this.getCreateChapterValidation().map(
      (validationChain) => validationChain.optional()
    );

    const episode = required("episode", { label: "قسمت فصل" })
      .optional()
      .ifExists()
      .toInt();

    return createValidation([...optionalFields, episode, slugValidator()]);
  }
}

export default ChapterValidator;
