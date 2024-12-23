import ValidatorConfiguration from "@/validators/configuration.validator";

class AuthUserValidator extends ValidatorConfiguration {
  email() {
    return this.required({ label: "ایمیل" }).email(
      this.SHARED_MESSAGES.common.auth_user.email
    );
  }

  newPassword(label = "رمز عبور") {
    return this.string(label).regex(this.SHARED_CONFIG.password.pattern, {
      message: this.SHARED_MESSAGES.common.auth_user.password.new(label),
    });
  }

  newPasswordConfirmation(label = "رمز عبور") {
    return this.required({ label: `تایید ${label}` });
  }

  currentPassword(label = "رمز عبور") {
    return this.minLength({
      label,
      minLength: this.SHARED_CONFIG.password.minLength,
    });
  }
}

export default AuthUserValidator;
