import { createValidation } from "@/validators";

import { verificationCodeValidator } from "./account.validator";

class UserAccountVerificationValidator {
  verifyValidation() {
    return createValidation([verificationCodeValidator()]);
  }
}

export default UserAccountVerificationValidator;
