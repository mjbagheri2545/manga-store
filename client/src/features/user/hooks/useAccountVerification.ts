import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { parseResponse } from "@/utils";

import API from "../api";
import { VerificationVerifyData } from "../api/account.api";

function useAccountVerification() {
  const navigate = useNavigate();

  async function getEmail() {
    const response = await API.account.verification.getEmail();

    parseResponse(response, () => {
      navigate(PATH.user.account.verification.verify);
    });
  }

  async function verify(data: VerificationVerifyData) {
    const response = await API.account.verification.verify(data);

    parseResponse(response, () => {
      navigate(PATH.home.landingPage);
    });
  }

  return {
    getEmail,
    verify,
  };
}

export default useAccountVerification;
