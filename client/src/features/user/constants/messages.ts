import { VERIFICATION_CODE_LENGTH } from "./global";

const USER_MESSAGES = {
  verificationCode: `طول کد تأیید باید ${VERIFICATION_CODE_LENGTH} کاراکتر باشد.`,
} as const;

export default USER_MESSAGES;
