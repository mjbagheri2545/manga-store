import { $Enums } from "@prisma/client";

import { STRING_MIN_LENGTH } from "@/constants/global/general.global";
import SHARED_MESSAGES from "@/constants/messages";
import { AutoBind } from "@/utils";
import {
  createValidation,
  required,
  slugValidator,
  string,
} from "@/validators";
import {
  emailNotInUseValidator,
  fullNameValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators/auth_user.validator";

import USER_MESSAGES from "../constants/messages";

const MAX_BIO_LENGTH = 600;

class UserCrudValidator extends AutoBind {
  private role() {
    return required("role", { label: "سطح دسترسی" })
      .custom((value) => {
        if (!Object.values($Enums.Role).includes(value)) {
          throw new Error();
        }
        return true;
      })
      .withMessage(USER_MESSAGES.validation.role);
  }

  private walletBalanceInToman() {
    return string("walletBalanceInToman")
      .optional()
      .ifExists()
      .custom((balance) => {
        const parsedBalance = parseInt(balance);
        return parsedBalance === 0 || parsedBalance > 0;
      })
      .withMessage(SHARED_MESSAGES.validation.minNumber("موجودی کیف پول", 1));
  }

  private bio() {
    return string("bio")
      .optional()
      .ifExists()
      .if((value) => value.length > 0)
      .isLength({ max: MAX_BIO_LENGTH })
      .withMessage(
        SHARED_MESSAGES.validation.minMaxLength(
          "بیوگرافی",
          STRING_MIN_LENGTH,
          MAX_BIO_LENGTH
        )
      );
  }

  private getCreateUserValidation() {
    return [
      emailNotInUseValidator(),
      fullNameValidator(),
      this.role(),
      newPasswordValidator(),
      newPasswordConfirmationValidator(),
    ];
  }

  createUserValidation() {
    return createValidation([
      ...this.getCreateUserValidation(),
      this.bio(),
      this.walletBalanceInToman(),
    ]);
  }

  updateUserValidation() {
    const optionalFields = this.getCreateUserValidation().map(
      (validationChain) => validationChain.optional()
    );

    const walletBalanceInToman = this.walletBalanceInToman()
      .optional()
      .ifExists()
      .toInt();

    return createValidation([
      ...optionalFields,
      slugValidator(),
      this.bio(),
      walletBalanceInToman,
    ]);
  }

  editProfileValidation() {
    return createValidation([
      emailNotInUseValidator(),
      fullNameValidator(),
      this.bio(),
    ]);
  }
}

export default UserCrudValidator;
