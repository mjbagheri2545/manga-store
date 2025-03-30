import { AutoBind } from "@/utils";
import { createValidation, required, slugValidator } from "@/validators";

class ChapterValidator extends AutoBind {
  private getCreateChapterValidation() {
    return [
      required("translatorId", { label: "مترجم" }),
      required("episode", { label: "قسمت فصل" }),
    ];
  }

  private getIdValidation() {
    return [
      slugValidator("productId", "آیدی محصول"),
      // for chapter id
      slugValidator("id", "آیدی فصل"),
    ];
  }

  idValidation() {
    return createValidation(this.getIdValidation());
  }

  createChapterValidation() {
    return createValidation([
      ...this.getCreateChapterValidation(),
      slugValidator("productId", "آیدی محصول"),
    ]);
  }

  updateChapterValidation() {
    const optionalFields = this.getCreateChapterValidation().map(
      (validationChain) => validationChain.optional()
    );

    return createValidation([...optionalFields, ...this.getIdValidation()]);
  }
}

export default ChapterValidator;
