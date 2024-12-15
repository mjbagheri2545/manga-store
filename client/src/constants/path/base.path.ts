function createBasePath() {
  return {
    auth: "/auth",
    user: "/users",
    home: "/",
  } as const;
}

export default createBasePath;
