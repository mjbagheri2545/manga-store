import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";

import USER_CONTENT from "../../constants/content";
import { useUserAccount } from "../../contexts/UserAccountContext";
import {
  PasswordRecoveryRecoverData,
  passwordRecoveryRecoverSchema,
} from "../../schemas/account.schema";
import IdentityVerificationForm from "./IdentityVerificationForm";

function PasswordRecoveryRecoverForm() {
  const formMethods = useForm<PasswordRecoveryRecoverData>({
    resolver: zodResolver(passwordRecoveryRecoverSchema),
  });

  const { recover, getEmail, getEmailData } =
    useUserAccount().password.recovery;

  function handleOnSubmit(data: PasswordRecoveryRecoverData) {
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
      submitButton={
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
