import generalMessages from "./general.message";
import validationMessages from "./validation.message";

const SHARED_MESSAGES = {
  validation: validationMessages,
  general: generalMessages,
} as const;

export default SHARED_MESSAGES;
