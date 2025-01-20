import { string } from "@/validators";

import USER_CONFIG from "../constants/config";
import USER_MESSAGES from "../constants/messages";

export function verificationCodeValidator() {
  const { verificationCodeLength } = USER_CONFIG;

  return string("verificationCode", "param")
    .isLength({
      max: verificationCodeLength,
      min: verificationCodeLength,
    })
    .withMessage(USER_MESSAGES.validation.verificationCode);
}
