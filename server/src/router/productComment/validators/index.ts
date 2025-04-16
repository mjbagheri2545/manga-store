import { AutoBind } from "@/utils";
import { createValidation, required, slugValidator } from "@/validators";
import {
  idValidators,
  productIdValidator,
} from "@/validators/chapter_productComment.validator";

class ProductCommentValidator extends AutoBind {
  private messageValidator() {
    return required("message", { label: "پیام" });
  }

  createProductCommentValidation() {
    return createValidation([this.messageValidator(), productIdValidator()]);
  }

  // i don't use .optional for message
  // because the only field user can
  // update is message, so if message
  // isn't changed, there is no update at all
  updateProductCommentValidation() {
    return createValidation([
      this.messageValidator(),
      ...idValidators("دیدگاه"),
    ]);
  }

  getAllRepliesValidation() {
    return createValidation([
      productIdValidator(),
      slugValidator("parentId", "آیدی دیدگاه"),
    ]);
  }

  replyValidation() {
    return createValidation([
      productIdValidator(),
      slugValidator("parentId", "آیدی دیدگاه"),
      slugValidator("replyToId", "آیدی کاربر"),
    ]);
  }
}

export default ProductCommentValidator;
