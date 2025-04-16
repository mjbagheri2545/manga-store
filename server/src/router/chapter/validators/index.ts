import { $Enums } from "@prisma/client";

import { AutoBind } from "@/utils";
import { createValidation, required } from "@/validators";
import {
  idValidators,
  productIdValidator,
} from "@/validators/chapter_productComment.validator";

import CHAPTER_MESSAGES from "../constants/messages";

class ChapterValidator extends AutoBind {
  private status() {
    return required("chapterStatus", { label: "سطح دسترسی" })
      .custom((value) => {
        if (!Object.values($Enums.ChapterStatus).includes(value)) {
          throw new Error();
        }
        return true;
      })
      .withMessage(CHAPTER_MESSAGES.invalidStatus);
  }

  private getCreateChapterValidation() {
    return [
      required("translatorId", { label: "مترجم" }),
      required("episode", { label: "قسمت فصل" }),
      this.status(),
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
