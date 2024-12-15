import { useLayoutEffect, useMemo } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import { deleteTokenFromHeaders, setTokenToHeaders } from "@/lib/axios";

function useToken() {
  const [token, setToken] = useLocalStorage<string>("token");
  const isLoggedIn = useMemo(() => token != null, [token]);

  useLayoutEffect(() => {
    if (token != null) {
      setTokenToHeaders(token);
    } else {
      deleteTokenFromHeaders();
    }
  }, [token]);

  return { isLoggedIn, setToken };
}

export default useToken;
