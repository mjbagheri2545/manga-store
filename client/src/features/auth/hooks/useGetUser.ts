import { useEffect, useState } from "react";

import { useExecuteApi } from "@/lib/api";
import { User } from "@/types";

import authApi from "../api";

function useGetUser(isLoggedIn: boolean) {
  const [user, setUser] = useState<User>();
  const { status, error, execute } = useExecuteApi(authApi.getUserByToken, {
    onSuccess: (result) => {
      setUser(result.data.user);
    },
  });

  useEffect(() => {
    if (!isLoggedIn) return;

    const timeoutId = setTimeout(() => {
      execute();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, execute]);

  return { user, setUser, status, error, execute };
}

export default useGetUser;
