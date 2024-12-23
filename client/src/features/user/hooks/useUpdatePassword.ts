import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { parseResponse } from "@/utils";

import API from "../api";
import {
  PasswordRecoveryGetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
} from "../api/account.api";

function useUpdatePassword() {
  const [getEmailData, setGetEmailData] =
    useState<PasswordRecoveryGetEmailData>();

  const navigate = useNavigate();

  async function passwordRecoveryGetEmail(data: PasswordRecoveryGetEmailData) {
    const response = await API.account.password.recovery.getEmail(data);

    parseResponse(response, () => {
      setGetEmailData(data);
    });
  }

  async function passwordRecoveryRecover(data: PasswordRecoveryRecoverData) {
    const response = await API.account.password.recovery.recover(data);

    parseResponse(response, () => {
      navigate(PATH.home.landingPage);
      setGetEmailData(undefined);
    });
  }

  async function passwordReset(data: PasswordResetData) {
    const response = await API.account.password.reset(data);

    parseResponse(response);
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
