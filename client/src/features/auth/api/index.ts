import { z } from "zod";

import ApiConfiguration from "@/api/configuration.api";
import { User } from "@/types";

import schema from "../schema";

export type RegistrationData = z.infer<typeof schema.registration>;
export type LoginData = z.infer<typeof schema.login>;

type LoginResponse = {
  token: string;
  user: User;
};

class AuthApi extends ApiConfiguration {
  register(data: RegistrationData) {
    return this.http.post(this.path.auth.registration, {
      data,
    });
  }

  login(data: LoginData) {
    return this.http.post<LoginData, LoginResponse>(this.path.auth.login, {
      data,
    });
  }

  logout() {
    return this.http.delete(this.path.auth.logout);
  }

  getUser() {
    return this.http.get<{user: User}>(this.path.user.getUser);
  }
}

export default new AuthApi();
