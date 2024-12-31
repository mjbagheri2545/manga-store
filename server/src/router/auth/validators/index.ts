import AuthUserValidator from "@/validators/auth_user.validator";

class Validator extends AuthUserValidator {
  registrationValidation() {
    return this.createValidation([
      this.fullName(),
      this.emailNotInUse(),
      this.newPassword(),
      this.newPasswordConfirmation(),
    ]);
  }

  loginValidation() {
    return this.createValidation([this.email(), this.currentPassword()]);
  }
}

export default Validator;
