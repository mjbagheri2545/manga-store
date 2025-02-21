import PATH from "@/constants/path";
import { HTTP } from "@/lib/http";
import { LoginData, RegistrationData } from "@/schemas/auth.schema";
import { User } from "@/types";

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
