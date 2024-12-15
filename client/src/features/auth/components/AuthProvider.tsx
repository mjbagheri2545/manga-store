import { PropsWithChildren } from "react";

import { AuthContext } from "../contexts";
import useAuthMethods from "../hooks/useAuthMethods";
import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";

function AuthProvider({ children: App }: PropsWithChildren) {
  const { isLoggedIn, setToken } = useToken();
  const { user, setUser } = useUser(isLoggedIn);

  const methods = useAuthMethods({
    user,
    setUser,
    setToken,
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, ...methods }}>
      {App}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
