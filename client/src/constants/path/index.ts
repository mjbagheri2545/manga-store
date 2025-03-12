import createAdminPath from "./admin.path";
import createAuthPath from "./auth.path";
import createBasePath from "./base.path";
import createHomePath from "./home.path";
import createProductPath from "./product.path";
import createUserPath from "./user.path";

const PATH = {
  base: createBasePath(),
  auth: createAuthPath(),
  user: createUserPath(),
  home: createHomePath(),
  admin: createAdminPath(),
  product: createProductPath(),
  getPathForRoute(path: string) {
    // /categories -> categories
    return path.slice(1);
  },
} as const;

export default PATH;
