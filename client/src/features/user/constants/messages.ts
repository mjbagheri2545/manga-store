import CONFIG from "./config";

const MESSAGES = {
  validation: {
    verificationCode: `طول کد تأیید باید ${CONFIG.verificationCodeLength} کاراکتر باشد.`,
  },
} as const;

export default MESSAGES;
