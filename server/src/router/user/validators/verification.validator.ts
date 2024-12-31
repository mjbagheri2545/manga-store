import AccountValidator from "./account.validator";

class VerificationValidator extends AccountValidator {
  verifyValidation() {
    return this.createValidation([this.verificationCode()]);
  }
}

export default VerificationValidator;
