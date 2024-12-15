import { Context, useContext } from "react";

function useContextValue<ContextType>(context: Context<ContextType | null>) {
  const contextValue = useContext(context);
  if (contextValue == null) {
    throw new Error("You must use this hook with it's provider!");
  }

  return contextValue;
}

export default useContextValue;
