import createBasePath from "./base.path";

function createAuthPath() {
  const { auth: authPath } = createBasePath();

  function createPath(path: string) {
    return `${authPath}/${path}`;
  }

  return {
    registration: createPath("register"),
    login: createPath("login"),
  } as const;
}

export default createAuthPath;
