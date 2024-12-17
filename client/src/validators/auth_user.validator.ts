import ValidatorConfiguration from "@/validators/configuration.validator";

class AuthUserValidator extends ValidatorConfiguration {
  email() {
    return this.required({ label: "ایمیل" }).email(
      this.MESSAGES.auth_user.common.email
    );
  }

  newPassword(label = "رمز عبور") {
    return this.string(label).regex(this.CONFIG.password.pattern, {
      message: this.MESSAGES.auth_user.common.password.new(label),
    });
  }

  newPasswordConfirmation(label = "رمز عبور") {
    return this.required({ label: `تایید ${label}` });
  }

  currentPassword(label = "رمز عبور") {
    return this.minLength({
      label,
      minLength: this.CONFIG.password.minLength,
    });
  }
}

export default AuthUserValidator;
