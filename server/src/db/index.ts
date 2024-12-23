import SharedTokenDb from "./token.db";
import SharedUserDb from "./user.db";

const SHARED_DB = {
  user: new SharedUserDb(),
  token: new SharedTokenDb(),
} as const;

export default SHARED_DB;
