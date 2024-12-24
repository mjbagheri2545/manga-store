import createGeneralMessages from "./general.message";
import createValidationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: createValidationMessages(),
  general: createGeneralMessages(),
} as const;

export default SHARED_MESSAGES;
