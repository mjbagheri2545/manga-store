import UserDb from "./user";

const DB = {
  user: new UserDb(),
} as const;

export default DB;
