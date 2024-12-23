import { createContext } from "react";

import useContextValue from "@/hooks/useContextValue";

import {
  PasswordRecoveryGetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
  VerificationVerifyData,
} from "../api/account.api";

type TUserContext = {
  account: {
    verification: {
      getEmail: () => Promise<void>;
      verify: (data: VerificationVerifyData) => Promise<void>;
    };
    password: {
      recovery: {
        getEmail: (data: PasswordRecoveryGetEmailData) => Promise<void>;
        recover: (data: PasswordRecoveryRecoverData) => Promise<void>;
        getEmailData?: PasswordRecoveryGetEmailData;
      };
      reset: (data: PasswordResetData) => Promise<void>;
    };
  };
};

export const UserContext = createContext<TUserContext | null>(null);

export function useUser() {
  return useContextValue(UserContext);
}
