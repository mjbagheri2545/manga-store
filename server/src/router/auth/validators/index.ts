import {
  createValidation,
  currentPasswordValidator,
  emailNotInUseValidator,
  emailValidator,
  fullNameValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators";

class Validator {
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

export default Validator;
