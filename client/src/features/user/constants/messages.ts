import USER_CONFIG from "./config";

const USER_MESSAGES = {
  validation: {
    verificationCode: `طول کد تأیید باید ${USER_CONFIG.verificationCodeLength} کاراکتر باشد.`,
  },
} as const;

export default USER_MESSAGES;
