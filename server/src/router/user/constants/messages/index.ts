import CONFIG from "../config";
import createAccountMessages from "./account.message";

const MESSAGES = {
  account: createAccountMessages(),
  validation: {
    verificationCode: `طول کد تأیید باید ${CONFIG.verificationCodeLength} کاراکتر باشد.`,
  },
} as const;

export default MESSAGES;
