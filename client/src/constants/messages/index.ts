import { createAuthUserMessages } from "./auth_user.message";
import createValidationMessages from "./validation.message";

const MESSAGES = {
  auth_user: createAuthUserMessages(),
  validation: createValidationMessages(),
} as const;

export default MESSAGES;
