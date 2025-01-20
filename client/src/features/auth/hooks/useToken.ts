import { useLayoutEffect, useMemo } from "react";

import { useLocalStorage } from "@/hooks";
import { deleteTokenFromHeaders, setTokenToHeaders } from "@/lib/http";

function useToken() {
  const [token, setToken] = useLocalStorage<string>("token");
  const isLoggedIn = useMemo(() => token != null, [token]);

  useLayoutEffect(() => {
    if (token == null) {
      return deleteTokenFromHeaders();
    }

    setTokenToHeaders(token);
  }, [token]);

  return { isLoggedIn, setToken };
}

export default useToken;
