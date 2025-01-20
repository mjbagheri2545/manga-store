import createBasePath from "./base.path";

function createUserPath() {
  const { user: userPath } = createBasePath();

  function createPath(path: string) {
    return `${userPath}/${path}`;
  }

  function crateAccountPath(path: string) {
    return `account/${path}`;
  }

  return {
    getFullPath: (path: string) => createPath(path),
    getUserByToken: createPath("get-by-token"),
    account: {
      verification: crateAccountPath("verification"),
      password: {
        recovery: crateAccountPath("password/recovery"),
        reset: crateAccountPath("password/reset"),
      },
    },
  } as const;
}

export default createUserPath;
