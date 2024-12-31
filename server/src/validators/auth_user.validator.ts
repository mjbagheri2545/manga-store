import SHARED_DB from "@/db";

import ValidatorConfiguration from "./configuration.validator";

class AuthUserValidator extends ValidatorConfiguration {
  protected email() {
    return this.string("email")
      .isEmail()
      .withMessage(this.SHARED_MESSAGES.features.auth_user.email);
  }

  protected currentPassword(field = "password", label = "رمز عبور") {
    const { minLength } = this.SHARED_CONFIG.password;

    return this.isLength(field, {
      min: minLength,
      label,
    });
  }

  protected newPassword(field = "password", label = "رمز عبور") {
    return this.string(field)
      .matches(this.SHARED_CONFIG.password.pattern)
      .withMessage(this.SHARED_MESSAGES.features.auth_user.password.new(label));
  }

  protected newPasswordConfirmation(
    field = "password",
    label = "تایید رمز عبور"
  ) {
    return this.string(`${field}Confirmation`)
      .custom((value, { req }) => value === req.body[field])
      .withMessage(
        this.SHARED_MESSAGES.features.auth_user.password.confirmation(label)
      );
  }

  protected fullName() {
    return this.isLength("fullName", { label: "نام و نام خانوادگی" });
  }

  protected emailNotInUse() {
    return this.email()
      .custom(async (value: string) => {
        const user = await SHARED_DB.user.getByEmail(value);
        if (user != null) {
          throw new Error();
        }
        return;
      })
      .withMessage(this.SHARED_MESSAGES.features.auth_user.emailInUse);
  }
}

export default AuthUserValidator;
