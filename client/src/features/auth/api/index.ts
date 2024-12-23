import { z } from "zod";

import ApiConfiguration from "@/api/configuration.api";
import { User } from "@/types";

import SCHEMA from "../schema";

export type RegistrationData = z.infer<typeof SCHEMA.registration>;
export type LoginData = z.infer<typeof SCHEMA.login>;

type LoginResponse = {
  token: string;
  user: User;
};

class Api extends ApiConfiguration {
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
}

const API = new Api();

export default API;
