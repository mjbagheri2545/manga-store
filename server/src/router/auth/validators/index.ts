import { createValidation } from "@/validators";
import {
  currentPasswordValidator,
  emailNotInUseValidator,
  emailValidator,
  fullNameValidator,
  newPasswordConfirmationValidator,
  newPasswordValidator,
} from "@/validators/auth_user.validator";

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
