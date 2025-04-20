import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";

import USER_CONTENT from "../../constants/content";
import { useUserAccount } from "../../contexts/UserAccountContext";
import {
  VerificationData,
  verificationSchema,
} from "../../schemas/account.schema";
import IdentityVerificationForm from "./IdentityVerificationForm";

function AccountVerificationVerifyForm() {
  const formMethods = useForm<VerificationData>({
    resolver: zodResolver(verificationSchema),
  });

  const { verify, getEmail } = useUserAccount().verification;

  function handleOnSubmit(data: VerificationData) {
    return verify(data);
  }

  return (
    <IdentityVerificationForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButton={USER_CONTENT.account.verification.verify.submitButtonText}
      content={USER_CONTENT.account.verification.mainContent}
      onResend={getEmail}
    >
      <InputField controllerName="verificationCode" label="کد تایید" />
    </IdentityVerificationForm>
  );
}

export default AccountVerificationVerifyForm;
