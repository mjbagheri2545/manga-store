import { string } from "@/validators";

import CONFIG from "../constants/config";
import MESSAGES from "../constants/messages";

export function verificationCodeValidator() {
  const { verificationCodeLength } = CONFIG;
  return string("verificationCode", "param")
    .isLength({
      max: verificationCodeLength,
      min: verificationCodeLength,
    })
    .withMessage(MESSAGES.validation.verificationCode);
}
