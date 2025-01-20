import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";

import { PasswordRecoveryRecoverData } from "../../api/account.api";
import USER_CONTENT from "../../constants/content";
import { useUserAccount } from "../../contexts/UserAccountContext";
import USER_ACCOUNT_SCHEMA from "../../schema/account.schema";
import IdentityVerificationForm from "./IdentityVerificationForm";

function PasswordRecoveryRecoverForm() {
  const formMethods = useForm({
    resolver: zodResolver(USER_ACCOUNT_SCHEMA.password.recovery.recover),
  });

  const { recover, getEmail, getEmailData } =
    useUserAccount().password.recovery;

  function handleOnSubmit(data: Omit<PasswordRecoveryRecoverData, "email">) {
    if (getEmailData == null) return Promise.reject();

    return recover({ ...data, email: getEmailData.email });
  }

  function handleOnResend() {
    if (getEmailData == null) return Promise.reject();

    return getEmail(getEmailData);
  }

  return (
    <IdentityVerificationForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={
        USER_CONTENT.account.password.recovery.recover.submitButtonText
      }
      content={USER_CONTENT.account.password.recovery.mainContent}
      onResend={handleOnResend}
    >
      <InputField controllerName="verificationCode" label="کد تایید" />
      <InputField controllerName="newPassword" label="رمز عبور جدید" />
      <InputField
        controllerName="newPasswordConfirmation"
        label="تایید رمز عبور جدید"
      />
    </IdentityVerificationForm>
  );
}

export default PasswordRecoveryRecoverForm;
