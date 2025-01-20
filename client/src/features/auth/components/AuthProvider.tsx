import { PropsWithChildren } from "react";

import { AuthContext } from "../contexts";
import useAuthMethods from "../hooks/useAuthMethods";
import useUser from "../hooks/useGetUser";
import useToken from "../hooks/useToken";

function AuthProvider({ children: App }: PropsWithChildren) {
  const { isLoggedIn, setToken } = useToken();
  const userState = useUser(isLoggedIn);

  const methods = useAuthMethods({
    ...userState,
    setToken,
  });

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user: userState.user, ...methods }}
    >
      {App}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
