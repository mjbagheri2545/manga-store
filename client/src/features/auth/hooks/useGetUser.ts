import { useLayoutEffect, useState } from "react";

import { User } from "@/types";
import { parseApiResponse } from "@/utils";

import authApi from "../api";

function useGetUser(isLoggedIn: boolean) {
  const [user, setUser] = useState<User>();

  useLayoutEffect(() => {
    if (!isLoggedIn) return;

    const request = async () => {
      parseApiResponse(
        await authApi.getUserByToken(),
        ({ data }) => {
          setUser(data.user);
        },
        { isToastSuccessfulMessageNeed: false, isToastErrorMessageNeed: false }
      );
    };
    request();
  }, [isLoggedIn]);

  return { user, setUser };
}

export default useGetUser;
