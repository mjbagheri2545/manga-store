import createAuthPath from "./auth.path";
import createBasePath from "./base.path";
import createHomePath from "./home.path";
import createUserPath from "./user.path";

const PATH = {
  base: createBasePath(),
  auth: createAuthPath(),
  user: createUserPath(),
  home: createHomePath(),
} as const;

export default PATH;
