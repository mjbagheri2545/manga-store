import { useLayoutEffect, useState } from "react";

import { User } from "@/types";
import { parseResponse } from "@/utils";

import api from "../api";

function useUser(isLoggedIn: boolean) {
  const [user, setUser] = useState<User>();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      const request = async () => {
        parseResponse(await api.getUser(), ({ data }) => {
          setUser(data.user);
        });
      };
      request();
    }
  }, [isLoggedIn]);

  return { user, setUser };
}

export default useUser;
