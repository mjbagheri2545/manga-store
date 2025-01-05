import featuresMessages from "./features.message";
import generalMessages from "./general.message";
import statusCodeMessages from "./statusCode.message";
import validationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: validationMessages,
  features: featuresMessages,
  statusCode: statusCodeMessages,
  general: generalMessages,
} as const;

export default SHARED_MESSAGES;
