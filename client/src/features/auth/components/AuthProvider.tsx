import { PropsWithChildren } from "react";

import { AuthContext } from "../contexts";
import useCreateAuthContextValue from "../hooks/useCreateAuthContextValue";

function AuthProvider({ children: App }: PropsWithChildren) {
  const contextValue = useCreateAuthContextValue();

  return (
    <AuthContext.Provider value={contextValue}>{App}</AuthContext.Provider>
  );
}

export default AuthProvider;
