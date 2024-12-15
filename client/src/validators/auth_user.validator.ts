import ValidatorConfiguration from "@/validators/configuration.validator";

class AuthUserValidator extends ValidatorConfiguration {
  email() {
    return this.required({ label: "ایمیل" }).email(this.messages.auth.email);
  }

  newPassword() {
    return this.string("رمز عبور").regex(this.config.password.pattern, {
      message: this.messages.auth.password.new,
    });
  }

  newPasswordConfirmation() {
    return this.required({ label: "تایید رمز عبور" });
  }

  currentPassword() {
    return this.minLength({
      label: "رمز عبور",
      minLength: this.config.password.minLength,
    });
  }
}

export default AuthUserValidator;
