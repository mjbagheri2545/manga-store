function createUserPath() {
  return { getUser: "/get-user" } as const;
}

export default createUserPath;
