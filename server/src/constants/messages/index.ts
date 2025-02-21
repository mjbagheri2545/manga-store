import crudMessages from "./crud.message";
import generalMessages from "./general.message";
import statusCodeMessages from "./statusCode.message";
import validationMessages from "./validation.message";

const SHARED_MESSAGES = {
  validation: validationMessages,
  crud: crudMessages,
  statusCode: statusCodeMessages,
  general: generalMessages,
} as const;

export default SHARED_MESSAGES;
