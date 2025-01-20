import generalMessages from "./general.message";
import validationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: validationMessages,
  general: generalMessages,
} as const;

export default SHARED_MESSAGES;
