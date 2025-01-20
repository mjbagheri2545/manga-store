import { z } from "zod";

import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import { User } from "@/types";

import AUTH_SCHEMA from "../schema";

export type RegistrationData = z.infer<typeof AUTH_SCHEMA.registration>;
export type LoginData = z.infer<typeof AUTH_SCHEMA.login>;

type LoginResponse = {
  token: string;
  user: User;
};

type GetUserByTokenResponse = {
  user: User;
};

class AuthApi {
  getUserByToken() {
    return HTTP.get<GetUserByTokenResponse>(PATH.user.getUserByToken);
  }

  register(data: RegistrationData) {
    return HTTP.post(PATH.auth.registration, {
      data,
    });
  }

  login(data: LoginData) {
    return HTTP.post<LoginResponse, LoginData>(PATH.auth.login, {
      data,
    });
  }
}

const authApi = new AuthApi();

export default authApi;
