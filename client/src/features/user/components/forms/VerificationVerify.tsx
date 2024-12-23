import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";

import { VerificationVerifyData } from "../../api/account.api";
import CONTENT from "../../constants/content";
import { useUser } from "../../contexts";
import SCHEMA from "../../schema";
import IdentityVerificationForm from "../IdentityVerificationForm";

function VerificationVerify() {
  const formMethods = useForm({
    resolver: zodResolver(SCHEMA.verification.verify),
  });

  const { verify, getEmail } = useUser().account.verification;

  function handleOnSubmit(data: VerificationVerifyData) {
    return verify(data);
  }

  return (
    <IdentityVerificationForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={CONTENT.account.verification.verify.submitButtonText}
      content={CONTENT.account.verification.mainContent}
      onResend={getEmail}
    >
      <InputField controllerName="verificationCode" label="کد تایید" />
    </IdentityVerificationForm>
  );
}

export default VerificationVerify;
