import { createCommonMessages } from "./common";
import createGeneralMessages from "./general.message";
import createStatusCodeMessages from "./statusCode.message";
import createValidationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: createValidationMessages(),
  common: createCommonMessages(),
  statusCode: createStatusCodeMessages(),
  general: createGeneralMessages(),
  failed: (message: string) =>
    `عملیات ${message} با شکست مواجه شد. لطفاً دوباره تلاش کنید.`,
} as const;

export default SHARED_MESSAGES;
