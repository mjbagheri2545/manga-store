import autoBind from "auto-bind";

import {
  createValidation,
  emailNotInUseValidator,
  fullNameValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
  required,
  slugValidator,
} from "@/validators";

import MESSAGES from "../constants/messages";

class CrudValidator {
  constructor() {
    autoBind(this);
  }
  private role() {
    return required("role", { label: "سطح دسترسی" })
      .custom((value) => {
        const roles = ["admin", "manager", "translator", "user"];

        if (!roles.includes(value)) {
          throw new Error();
        }
        return;
      })
      .withMessage(MESSAGES.validation.role);
  }

  private walletBalance() {
    return required("walletBalance", {
      label: "موجودی کیف پول",
    });
  }

  private bio() {
    return required("bio", { label: "بیوگرافی" }).optional();
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
      this.walletBalance().toInt(),
    ]);
  }

  updateUserValidation() {
    const optionalFields = this.getCreateUserValidation().map(
      (validationChain) => validationChain.optional()
    );

    const walletBalance = this.walletBalance().optional().ifExists().toInt();

    return createValidation([
      ...optionalFields,
      slugValidator(),
      this.bio(),
      walletBalance,
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

export default CrudValidator;
