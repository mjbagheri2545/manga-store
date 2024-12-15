import createAuthPath from "./auth.path";
import createBasePath from "./base.path";
import createUserPath from "./user";

const PATH = {
  base: createBasePath(),
  auth: createAuthPath(),
  user: createUserPath(),
} as const;

export default PATH;
