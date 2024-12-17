import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import MESSAGES from "@/constants/messages";
import PATH from "@/constants/path";
import { State } from "@/types";
import { parseResponse } from "@/utils";

import api, { LoginData, RegistrationData } from "../api";
import useUser from "./useUser";

type UseAuthMethods = {
  setToken: State<string | undefined>[1];
} & ReturnType<typeof useUser>;

function useAuthMethods({ user, setUser, setToken }: UseAuthMethods) {
  const navigate = useNavigate();

  async function register(data: RegistrationData) {
    parseResponse(await api.register(data), () => {
      navigate(PATH.auth.login);
    });
  }

  async function login(data: LoginData) {
    if (user?.email === data.email) {
      toast.info(MESSAGES.auth_user.auth.alreadyLoggedIn);
      return;
    }

    parseResponse(await api.login(data), ({ data: responseData }) => {
      setToken(responseData.token);
      setUser(responseData.user);
      navigate(PATH.base.home);
    });
  }

  async function logout() {
    setToken(undefined);
    setUser(undefined);
    navigate(PATH.auth.login);

    toast.success(MESSAGES.auth_user.auth.logout);
  }

  return { register, login, logout };
}

export default useAuthMethods;
