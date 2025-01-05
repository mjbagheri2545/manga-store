import { createValidation } from "@/validators";

import { verificationCodeValidator } from "./account.validator";

class VerificationValidator {
  verifyValidation() {
    return createValidation([verificationCodeValidator()]);
  }
}

export default VerificationValidator;
