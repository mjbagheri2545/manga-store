import { createAuthUserMessages } from "./auth_user.message";
import createStatusCodeMessages from "./statusCode.message";
import createValidationMessages from "./validation.message";

const MESSAGES = {
  auth_user: createAuthUserMessages(),
  statusCode: createStatusCodeMessages(),
  validation: createValidationMessages(),
  failed: (message: string) =>
    `عملیات ${message} با شکست مواجه شد. لطفاً دوباره تلاش کنید.`,
} as const;

export default MESSAGES;
