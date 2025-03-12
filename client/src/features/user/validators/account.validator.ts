import { string } from "@/validators";

import USER_CONFIG from "../constants/config";
import USER_MESSAGES from "../constants/messages";

export function verificationCodeValidator() {
  return string("کد تایید").length(USER_CONFIG.verificationCodeLength, {
    message: USER_MESSAGES.verificationCode,
  });
}
