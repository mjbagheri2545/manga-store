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
    return this.HTTP.post(this.PATH.auth.registration, {
      data,
    });
  }

  login(data: LoginData) {
    return this.HTTP.post<LoginData, LoginResponse>(this.PATH.auth.login, {
      data,
    });
  }

  getUser() {
    return this.HTTP.get<{ user: User }>(this.PATH.user.getUser);
  }
}

export default new AuthApi();
