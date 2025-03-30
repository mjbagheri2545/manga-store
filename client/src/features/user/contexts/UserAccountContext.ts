import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ApiMethodWrapper } from "@/types";

import {
  GetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
  VerificationData,
} from "../schemas/account.schema";

export type TUserAccountContext = {
  verification: {
    getEmail: ApiMethodWrapper;
    verify: ApiMethodWrapper<VerificationData>;
  };
  password: {
    recovery: {
      getEmail: ApiMethodWrapper<GetEmailData>;
      recover: ApiMethodWrapper<PasswordRecoveryRecoverData>;
      getEmailData?: GetEmailData;
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
