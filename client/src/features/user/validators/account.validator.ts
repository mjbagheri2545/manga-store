import { string } from "@/validators";

import { VERIFICATION_CODE_LENGTH } from "../constants/global";
import USER_MESSAGES from "../constants/messages";

export function verificationCodeValidator() {
  return string("کد تایید").length(VERIFICATION_CODE_LENGTH, {
    message: USER_MESSAGES.verificationCode,
  });
}
