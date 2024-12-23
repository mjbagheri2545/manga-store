import Validator from ".";

class VerificationValidator extends Validator {
  verifyValidation() {
    return this.createValidation([this.verificationCode()]);
  }
}

export default VerificationValidator;
