import {
  createValidation,
  currentPasswordValidator,
  emailNotInUseValidator,
  emailValidator,
  fullNameValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators";

class AuthValidator {
  registrationValidation() {
    return createValidation([
      fullNameValidator(),
      emailNotInUseValidator(),
      newPasswordValidator(),
      newPasswordConfirmationValidator(),
    ]);
  }

  loginValidation() {
    return createValidation([emailValidator(), currentPasswordValidator()]);
  }
}

export default AuthValidator;
