import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ApiWrapper } from "@/types";

import {
  AccountVerificationVerifyData,
  PasswordRecoveryGetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
} from "../api/account.api";

export type TUserAccountContext = {
  verification: {
    getEmail: ApiWrapper;
    verify: ApiWrapper<AccountVerificationVerifyData>;
  };
  password: {
    recovery: {
      getEmail: ApiWrapper<PasswordRecoveryGetEmailData>;
      recover: ApiWrapper<PasswordRecoveryRecoverData>;
      getEmailData?: PasswordRecoveryGetEmailData;
    };
    reset: ApiWrapper<PasswordResetData>;
  };
};

export const UserAccountContext = createContext<TUserAccountContext | null>(
  null
);

export function useUserAccount() {
  return useContextValue(UserAccountContext);
}
