import { createAuthUserValidationMessages } from "./auth_user.validationMessage";

function createCommonValidationMessages() {
  return { auth_user: createAuthUserValidationMessages() } as const;
}

export default createCommonValidationMessages;
