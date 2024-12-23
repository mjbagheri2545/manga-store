import { useLayoutEffect, useState } from "react";

import SHARED_API from "@/api";
import { User } from "@/types";
import { parseResponse } from "@/utils";

function useGetUser(isLoggedIn: boolean) {
  const [user, setUser] = useState<User>();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      const request = async () => {
        parseResponse(
          await SHARED_API.user.getUser(),
          ({ data }) => {
            setUser(data.user);
          },
          { isToastSuccessfulMessageNeed: false }
        );
      };
      request();
    }
  }, [isLoggedIn]);

  return { user, setUser };
}

export default useGetUser;
