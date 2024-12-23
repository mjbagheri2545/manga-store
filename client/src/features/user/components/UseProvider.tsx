import { PropsWithChildren } from "react";

import { UserContext } from "../contexts";
import useAccount from "../hooks/useAccount";

function UserProvider({ children: App }: PropsWithChildren) {
  const account = useAccount();

  return <UserContext.Provider value={{ account }}>{App}</UserContext.Provider>;
}

export default UserProvider;
