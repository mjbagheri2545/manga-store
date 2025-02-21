import { useNavigate } from "react-router-dom";

import PATH from "@/constants/path";
import { parseApiResponse } from "@/utils";

import userAccountApi from "../api/account.api";
import { VerificationData } from "../schemas/account.schema";

function useAccountVerification() {
  const navigate = useNavigate();

  async function getEmail() {
    const response = await userAccountApi.verification.getEmail();

    parseApiResponse(response, () => {
      navigate(PATH.user.getFullPath(PATH.user.account.verification));
    });
  }

  async function verify(data: VerificationData) {
    const response = await userAccountApi.verification.verify(data);

    parseApiResponse(response, () => {
      navigate(PATH.home.landingPage);
    });
  }

  return {
    getEmail,
    verify,
  };
}

export default useAccountVerification;
