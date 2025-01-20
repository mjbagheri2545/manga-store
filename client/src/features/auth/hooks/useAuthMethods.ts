import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { State } from "@/types";
import { parseApiResponse } from "@/utils";

import authApi, { LoginData, RegistrationData } from "../api";
import AUTH_MESSAGES from "../constants/messages";
import useGetUser from "./useGetUser";

type UseAuthMethods = {
  setToken: State<string | undefined>[1];
} & ReturnType<typeof useGetUser>;

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

  async function logout() {
    setToken(undefined);
    setUser(undefined);
    navigate(PATH.auth.login);

    toast.success(AUTH_MESSAGES.logout);
  }

  return { register, login, logout };
}

export default useAuthMethods;
