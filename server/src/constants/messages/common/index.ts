import createAuthUserMessages from "./auth_user.message";

export function createCommonMessages() {
  return {
    auth_user: createAuthUserMessages(),
  } as const;
}
