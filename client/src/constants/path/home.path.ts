import createBasePath from "./base.path";

function createHomePath() {
  const { home: homePath } = createBasePath();

  return { landingPage: homePath } as const;
}

export default createHomePath;
