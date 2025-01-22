import { TAuthContext } from "../contexts";
import useAuthMethods from "./useAuthMethods";
import useGetUser from "./useGetUser";
import useToken from "./useToken";

function useCreateAuthContextValue(): TAuthContext {
  const { isLoggedIn, setToken } = useToken();
  const userState = useGetUser(isLoggedIn);

  const methods = useAuthMethods({
    ...userState,
    setToken,
  });

  return { isLoggedIn, user: userState.user, ...methods };
}

export default useCreateAuthContextValue;
