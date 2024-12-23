import AuthUserValidator from "@/validators/auth_user.validator";

import CONFIG from "../constants/config";
import MESSAGES from "../constants/messages";

class Validator extends AuthUserValidator {
  verificationCode() {
    return this.string("کد تایید").length(CONFIG.verificationCodeLength, {
      message: MESSAGES.validation.verificationCode,
    });
  }
}

export default Validator;
