import createBasePath from "./base.path";

function createHomePath() {
  const { home: homePath, tag } = createBasePath();

  return { landingPage: homePath, tagsPage: tag } as const;
}

export default createHomePath;
