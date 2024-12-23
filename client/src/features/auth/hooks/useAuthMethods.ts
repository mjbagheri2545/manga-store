import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { State } from "@/types";
import { parseResponse } from "@/utils";

import API, { LoginData, RegistrationData } from "../api";
import MESSAGES from "../constants/messages";
import useUser from "./useGetUser";

type UseAuthMethods = {
  setToken: State<string | undefined>[1];
} & ReturnType<typeof useUser>;

function useAuthMethods({ user, setUser, setToken }: UseAuthMethods) {
  const navigate = useNavigate();

  async function register(data: RegistrationData) {
    parseResponse(await API.register(data), () => {
      navigate(PATH.auth.login);
    });
  }

  async function login(data: LoginData) {
    if (user?.email === data.email) {
      toast.info(MESSAGES.alreadyLoggedIn);
      return;
    }

    parseResponse(await API.login(data), ({ data: responseData }) => {
      setToken(responseData.token);
      setUser(responseData.user);
      navigate(PATH.home.landingPage);
    });
  }

  async function logout() {
    setToken(undefined);
    setUser(undefined);
    navigate(PATH.auth.login);

    toast.success(MESSAGES.logout);
  }

  return { register, login, logout };
}

export default useAuthMethods;
