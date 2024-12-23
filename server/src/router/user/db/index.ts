import TokenDb from "./token.db";
import UserDb from "./user.db";

const DB = { user: new UserDb(), token: new TokenDb() } as const;

export default DB;
