import { AutoBind } from "@/utils";
import {
  createValidation,
  currentPasswordValidator,
  emailValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators";

import { verificationCodeValidator } from "./account.validator";

class UserAccountPasswordValidator extends AutoBind {
  private getChangePasswordValidation() {
    return [
      newPasswordValidator("newPassword", "رمز عبور جدید"),
      newPasswordConfirmationValidator("newPassword", "تایید رمز عبور جدید"),
    ];
  }

  getEmailValidation() {
    return createValidation([emailValidator()]);
  }

  recoverValidation() {
    return createValidation([
      verificationCodeValidator(),
      emailValidator(),
      ...this.getChangePasswordValidation(),
    ]);
  }

  resetValidation() {
    return createValidation([
      currentPasswordValidator("currentPassword", "رمز عبور فعلی"),
      ...this.getChangePasswordValidation(),
    ]);
  }
}

export default UserAccountPasswordValidator;
