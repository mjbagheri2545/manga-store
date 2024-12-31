import createFeaturesMessages from "./features";
import createGeneralMessages from "./general.message";
import createStatusCodeMessages from "./statusCode.message";
import createValidationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: createValidationMessages(),
  features: createFeaturesMessages(),
  statusCode: createStatusCodeMessages(),
  general: createGeneralMessages(),
} as const;

export default SHARED_MESSAGES;
