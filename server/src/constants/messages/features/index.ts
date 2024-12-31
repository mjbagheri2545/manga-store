import createAuthUserMessages from "./auth_user.message";
import createCrudMessages from "./crud.message";

function createFeaturesMessages() {
  return {
    auth_user: createAuthUserMessages(),
    crud: createCrudMessages(),
  } as const;
}

export default createFeaturesMessages;
