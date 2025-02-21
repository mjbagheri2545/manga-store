import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { parseApiResponse } from "@/utils";

import userAccountApi from "../api/account.api";
import {
  GetEmailData,
  PasswordRecoveryRecoverData,
  PasswordResetData,
} from "../schemas/account.schema";

function useUpdatePassword() {
  const [getEmailData, setGetEmailData] = useState<GetEmailData>();

  const navigate = useNavigate();

  async function passwordRecoveryGetEmail(data: GetEmailData) {
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
