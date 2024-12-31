import AccountValidator from "./account.validator";

class PasswordValidator extends AccountValidator {
  private getChangePasswordValidation() {
    return [
      this.newPassword("newPassword", "رمز عبور جدید"),
      this.newPasswordConfirmation("newPassword", "تایید رمز عبور جدید"),
    ];
  }

  getEmailValidation() {
    return this.createValidation([this.email()]);
  }

  recoverValidation() {
    return this.createValidation([
      this.verificationCode(),
      this.email(),
      ...this.getChangePasswordValidation(),
    ]);
  }

  resetValidation() {
    return this.createValidation([
      this.currentPassword("currentPassword", "رمز عبور فعلی"),
      ...this.getChangePasswordValidation(),
    ]);
  }
}

export default PasswordValidator;
