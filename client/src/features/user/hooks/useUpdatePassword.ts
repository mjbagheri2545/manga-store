import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { parseApiResponse } from "@/utils";

import userAccountApi, {
  PasswordRecoveryGetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
} from "../api/account.api";

function useUpdatePassword() {
  const [getEmailData, setGetEmailData] =
    useState<PasswordRecoveryGetEmailData>();

  const navigate = useNavigate();

  async function passwordRecoveryGetEmail(data: PasswordRecoveryGetEmailData) {
    const response = await userAccountApi.password.recovery.getEmail(data);

    parseApiResponse(response, () => {
      setGetEmailData(data);
    });
  }

  async function passwordRecoveryRecover(data: PasswordRecoveryRecoverData) {
    const response = await userAccountApi.password.recovery.recover(data);

    parseApiResponse(response, () => {
      navigate(PATH.home.landingPage);
      setGetEmailData(undefined);
    });
  }

  async function passwordReset(data: PasswordResetData) {
    const response = await userAccountApi.password.reset(data);

    parseApiResponse(response);
  }

  return {
    recovery: {
      getEmailData,
      getEmail: passwordRecoveryGetEmail,
      recover: passwordRecoveryRecover,
    },
    reset: passwordReset,
  };
}

export default useUpdatePassword;
