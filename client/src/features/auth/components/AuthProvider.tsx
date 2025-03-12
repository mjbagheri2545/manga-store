import { PropsWithChildren } from "react";

import { AuthContext, TAuthContext } from "@/contexts/AuthContext";

import useAuthMethods from "../hooks/useAuthMethods";
import useGetUser from "../hooks/useGetUser";
import useToken from "../hooks/useToken";
import LoggedInUser from "./LoggedInUser";

function AuthProvider({ children: App }: PropsWithChildren) {
  const { userState, ...restState } = useAuthProvider();

  if (!restState.isLoggedIn) {
    return (
      <AuthContext.Provider value={restState as TAuthContext}>
        {App}
      </AuthContext.Provider>
    );
  }

  return (
    <LoggedInUser userState={userState} {...restState} isLoggedIn>
      {App}
    </LoggedInUser>
  );
}

export default AuthProvider;

function useAuthProvider() {
  const { isLoggedIn, setToken } = useToken();
  const { setUser, ...userState } = useGetUser(isLoggedIn);

  const methods = useAuthMethods({
    setUser,
    user: userState.user,
    setToken,
  });

  return { isLoggedIn, userState, ...methods };
}
