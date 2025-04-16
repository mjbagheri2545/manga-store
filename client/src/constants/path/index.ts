import createAdminPath from "./admin.path";
import createAuthPath from "./auth.path";
import createBasePath from "./base.path";
import createChapterPath from "./chapter.path";
import createHomePath from "./home.path";
import createProductPath from "./product.path";
import createProductCommentPath from "./productComment.path";
import createUserPath from "./user.path";

const PATH = {
  base: createBasePath(),
  auth: createAuthPath(),
  user: createUserPath(),
  home: createHomePath(),
  admin: createAdminPath(),
  product: createProductPath(),
  chapter: createChapterPath(),
  productComment: createProductCommentPath(),
  getPathForRoute(path: string) {
    // /categories -> categories
    return path.slice(1);
  },
} as const;

export default PATH;
