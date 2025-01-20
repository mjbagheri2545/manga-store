import authUserValidationMessages from "./auth_user.validationMessage";

const generalValidationMessages = {
  auth_user: authUserValidationMessages,
} as const;

export default generalValidationMessages;
