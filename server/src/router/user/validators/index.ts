import AuthUserValidator from "@/validators/auth_user.validator";

import CONFIG from "../constants/config";
import MESSAGES from "../constants/messages";

abstract class Validator extends AuthUserValidator {
  protected verificationCode() {
    const { verificationCodeLength } = CONFIG;
    return this.string("verificationCode", "params")
      .isLength({
        max: verificationCodeLength,
        min: verificationCodeLength,
      })
      .withMessage(MESSAGES.validation.verificationCode);
  }
}

export default Validator;
