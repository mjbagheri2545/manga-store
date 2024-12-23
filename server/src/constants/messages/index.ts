import { createCommonMessages } from "./common";
import createStatusCodeMessages from "./statusCode.message";
import createValidationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: createValidationMessages(),
  common: createCommonMessages(),
  statusCode: createStatusCodeMessages(),
  unexpectedError: "متأسفیم، خطایی غیرمنتظره رخ داده است.",
  failed: (message: string) =>
    `عملیات ${message} با شکست مواجه شد. لطفاً دوباره تلاش کنید.`,
} as const;

export default SHARED_MESSAGES;
