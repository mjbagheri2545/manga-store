import createBasePath from "../base.path";
import createUserAccountPath from "./account.path";

function createUserPath() {
  const { user: userPath } = createBasePath();

  function createPath(path: string) {
    return `${userPath}/${path}`;
  }

  return {
    getUser: createPath("get-user"),
    account: createUserAccountPath(),
  } as const;
}

export default createUserPath;
