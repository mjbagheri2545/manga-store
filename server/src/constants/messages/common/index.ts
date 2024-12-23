import createAuthUserMessages from "./auth_user.message";
import createGeneralMessages from "./general.message";

export function createCommonMessages() {
  return {
    auth_user: createAuthUserMessages(),
    general: createGeneralMessages(),
  } as const;
}
