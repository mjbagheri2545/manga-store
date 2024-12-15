import createBasePath from "../base.path";

function createUserAccountPath() {
  const { user: userPath } = createBasePath();

  function createPath(path: string) {
    return `${userPath}/account/${path}`;
  }

  return {
    verify: {
      getEmail: createPath("verification/get-email"),
      action: createPath("verification/verify"),
    },
    password: {
      recovery: {
        getEmail: createPath("password/recovery/get-email"),
        action: createPath("password/recovery"),
      },
      reset: createPath("password/reset"),
    },
  } as const;
}

export default createUserAccountPath;
