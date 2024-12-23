import createBasePath from "../base.path";

function createUserAccountPath() {
  const { user: userPath } = createBasePath();

  function createPath(path: string) {
    return `${userPath}/account/${path}`;
  }

  return {
    verification: {
      getEmail: createPath("verification/get-email"),
      verify: createPath("verification"),
    },
    password: {
      recovery: {
        getEmail: createPath("password/recovery/get-email"),
        recover: createPath("password/recovery"),
      },
      reset: createPath("password/reset"),
    },
  } as const;
}

export default createUserAccountPath;
