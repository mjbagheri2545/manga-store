import createAuthPath from "./auth.path";
import createBasePath from "./base.path";
import createUserPath from "./user";

const PATH = {
  auth: createAuthPath(),
  base: createBasePath(),
  user: createUserPath(),
} as const;

export default PATH;
