import ValidatorConfiguration from "./configuration.validator";

class AuthUserValidator extends ValidatorConfiguration {
  email() {
    return this.string("email")
      .isEmail()
      .withMessage(this.MESSAGES.auth_user.common.email);
  }

  currentPassword(field = "password", label = "رمز عبور") {
    return this.minLength(field, {
      minLength: this.CONFIG.password.minLength,
      label,
    });
  }

  newPassword(field = "password", label = "رمز عبور") {
    return this.string(field)
      .matches(new RegExp(this.CONFIG.password.pattern))
      .withMessage(this.MESSAGES.auth_user.common.password.new(label));
  }

  newPasswordConfirmation(field = "password", label = "تایید رمز عبور") {
    return this.string(`${field}Confirmation`)
      .custom((value, { req }) => value === req.body[field])
      .withMessage(this.MESSAGES.auth_user.common.password.confirmation(label));
  }
}

export default AuthUserValidator;
