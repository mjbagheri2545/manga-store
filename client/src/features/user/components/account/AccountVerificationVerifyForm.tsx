import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";

import { AccountVerificationVerifyData } from "../../api/account.api";
import USER_CONTENT from "../../constants/content";
import { useUserAccount } from "../../contexts/UserAccountContext";
import USER_ACCOUNT_SCHEMA from "../../schema/account.schema";
import IdentityVerificationForm from "./IdentityVerificationForm";

function AccountVerificationVerifyForm() {
  const formMethods = useForm({
    resolver: zodResolver(USER_ACCOUNT_SCHEMA.verification.verify),
  });

  const { verify, getEmail } = useUserAccount().verification;

  function handleOnSubmit(data: AccountVerificationVerifyData) {
    return verify(data);
  }

  return (
    <IdentityVerificationForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={
        USER_CONTENT.account.verification.verify.submitButtonText
      }
      content={USER_CONTENT.account.verification.mainContent}
      onResend={getEmail}
    >
      <InputField controllerName="verificationCode" label="کد تایید" />
    </IdentityVerificationForm>
  );
}

export default AccountVerificationVerifyForm;
