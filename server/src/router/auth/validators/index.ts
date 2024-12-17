import MESSAGES from "@/constants/messages";
import DB from "@/db";
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

  private fullName() {
    return this.minLength("fullName", { label: "نام و نام خانوادگی" });
  }

  private emailNotInUse() {
    return this.email()
      .custom(async (value: string) => {
        const user = await DB.user.getByEmail(value);
        if (user != null) {
          throw new Error();
        }
        return;
      })
      .withMessage(MESSAGES.statusCode.conflict);
  }
}

export default Validator;
