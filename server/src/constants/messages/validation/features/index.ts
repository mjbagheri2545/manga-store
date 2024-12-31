import { createAuthUserValidationMessages } from "./auth_user.validationMessage";

function createFeaturesValidationMessages() {
  return { auth_user: createAuthUserValidationMessages() } as const;
}

export default createFeaturesValidationMessages;
