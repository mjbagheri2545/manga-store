import createBasePath from "./base.path";

function createUserPath() {
  const { user: userPath } = createBasePath();

  function createPath(path: string) {
    return `${userPath}/${path}`;
  }

  function createAccountPath(path: string) {
    return `account/${path}`;
  }

  return {
    getFullPath: (path: string) => createPath(path),
    getUserByToken: createPath("get-by-token"),
    getManagers: createPath("managers"),
    account: {
      verification: createAccountPath("verification"),
      password: {
        recovery: createAccountPath("password/recovery"),
        reset: createAccountPath("password/reset"),
      },
    },
  } as const;
}

export default createUserPath;
