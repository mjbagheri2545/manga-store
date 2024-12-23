import UserApi from "./user.api";

const SHARED_API = {
  user: new UserApi(),
} as const;

export default SHARED_API;
