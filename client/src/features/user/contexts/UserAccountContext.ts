import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ApiMethodWrapper } from "@/types";

import {
  AccountVerificationVerifyData,
  PasswordRecoveryGetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
} from "../api/account.api";

export type TUserAccountContext = {
  verification: {
    getEmail: ApiMethodWrapper;
    verify: ApiMethodWrapper<AccountVerificationVerifyData>;
  };
  password: {
    recovery: {
      getEmail: ApiMethodWrapper<PasswordRecoveryGetEmailData>;
      recover: ApiMethodWrapper<PasswordRecoveryRecoverData>;
      getEmailData?: PasswordRecoveryGetEmailData;
    };
    reset: ApiMethodWrapper<PasswordResetData>;
  };
};

export const UserAccountContext = createContext<TUserAccountContext | null>(
  null
);

export function useUserAccount() {
  return useContextValue(UserAccountContext);
}
