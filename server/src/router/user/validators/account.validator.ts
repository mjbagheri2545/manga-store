import { string } from "@/validators";

import { VERIFICATION_CODE_LENGTH } from "../constants/global";
import USER_MESSAGES from "../constants/messages";

export function verificationCodeValidator() {
  return string("verificationCode", "param")
    .isLength({
      max: VERIFICATION_CODE_LENGTH,
      min: VERIFICATION_CODE_LENGTH,
    })
    .withMessage(USER_MESSAGES.validation.verificationCode);
}
