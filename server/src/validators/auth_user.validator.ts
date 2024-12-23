import ValidatorConfiguration from "./configuration.validator";

class AuthUserValidator extends ValidatorConfiguration {
  protected email() {
    return this.string("email")
      .isEmail()
      .withMessage(this.SHARED_MESSAGES.common.auth_user.email);
  }

  protected currentPassword(field = "password", label = "رمز عبور") {
    return this.minLength(field, {
      minLength: this.SHARED_CONFIG.password.minLength,
      label,
    });
  }

  protected newPassword(field = "password", label = "رمز عبور") {
    return this.string(field)
      .matches(this.SHARED_CONFIG.password.pattern)
      .withMessage(this.SHARED_MESSAGES.common.auth_user.password.new(label));
  }

  protected newPasswordConfirmation(
    field = "password",
    label = "تایید رمز عبور"
  ) {
    return this.string(`${field}Confirmation`)
      .custom((value, { req }) => value === req.body[field])
      .withMessage(
        this.SHARED_MESSAGES.common.auth_user.password.confirmation(label)
      );
  }
}

export default AuthUserValidator;
