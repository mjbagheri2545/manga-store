import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { LoginData, RegistrationData } from "@/schemas/auth.schema";
import { State, User } from "@/types";
import { parseApiResponse } from "@/utils";

import authApi from "../api";
import AUTH_MESSAGES from "../constants/messages";

type UseAuthMethods = {
  setToken: State<string | undefined>[1];
  user: State<User | undefined>[0];
  setUser: State<User | undefined>[1];
};

function useAuthMethods({ user, setUser, setToken }: UseAuthMethods) {
  const navigate = useNavigate();

  async function register(data: RegistrationData) {
    parseApiResponse(await authApi.register(data), () => {
      navigate(PATH.auth.login);
    });
  }

  async function login(data: LoginData) {
    if (user?.email === data.email) {
      toast.info(AUTH_MESSAGES.alreadyLoggedIn);
      return;
    }

    parseApiResponse(await authApi.login(data), ({ data: responseData }) => {
      setToken(responseData.token);
      setUser(responseData.user);
      navigate(PATH.home.landingPage);
    });
  }

  function logout() {
    setToken(undefined);
    setUser(undefined);
    navigate(PATH.auth.login);

    toast.success(AUTH_MESSAGES.logout);
  }

  return { register, login, logout };
}

export default useAuthMethods;
