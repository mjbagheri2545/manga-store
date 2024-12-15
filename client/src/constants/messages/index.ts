import { createAuthMessages } from "./auth.message";
import createValidationMessages from "./validation.message";

const MESSAGES = {
  auth: createAuthMessages(),
  validation: createValidationMessages(),
} as const;

export default MESSAGES;
