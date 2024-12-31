import AuthUserValidator from "@/validators/auth_user.validator";

import MESSAGES from "../constants/messages";

class CrudValidator extends AuthUserValidator {
  private role() {
    return this.string("role")
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
    return this.required("walletBalance", {
      label: "موجودی کیف پول",
    });
  }

  private bio() {
    return this.required("bio", { label: "بیوگرافی" }).optional();
  }

  private getCreateUserValidation() {
    return [
      this.emailNotInUse(),
      this.fullName(),
      this.role(),
      this.newPassword(),
    ];
  }

  createUserValidation() {
    return this.createValidation([
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

    return this.createValidation([
      ...optionalFields,
      this.slug(),
      this.bio(),
      walletBalance,
    ]);
  }

  editProfileValidation() {
    return this.createValidation([
      this.emailNotInUse(),
      this.fullName(),
      this.bio(),
    ]);
  }
}

export default CrudValidator;
