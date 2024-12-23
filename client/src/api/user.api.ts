import { User } from "@/types";

import ApiConfiguration from "./configuration.api";

class UserApi extends ApiConfiguration {
  getUser() {
    return this.HTTP.get<{ user: User }>(this.PATH.user.getUser);
  }
}

export default UserApi;
