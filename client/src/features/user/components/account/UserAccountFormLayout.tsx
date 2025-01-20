import { PropsWithChildren } from "react";

import { Auth_UserAccountFormLayout } from "@/components/ui/auth_user";

import { UserAccountContext } from "../../contexts/UserAccountContext";
import useCreateUserAccountContextValue from "../../hooks/useCreateUserAccountContextValue";

function UserAccountFormLayout(props: PropsWithChildren) {
  const contextValue = useCreateUserAccountContextValue();

  return (
    <UserAccountContext.Provider value={contextValue}>
      <Auth_UserAccountFormLayout {...props} />
    </UserAccountContext.Provider>
  );
}

export default UserAccountFormLayout;
