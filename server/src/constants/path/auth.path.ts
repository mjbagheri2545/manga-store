function createAuthPath() {
  return {
    registration: "/register",
    login: "/login",
  } as const;
}

export default createAuthPath;
