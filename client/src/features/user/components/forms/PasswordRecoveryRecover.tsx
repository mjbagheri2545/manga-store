import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";

import {
  PasswordRecoveryGetEmailData,
  PasswordRecoveryRecoverData,
} from "../../api/account.api";
import CONTENT from "../../constants/content";
import { useUser } from "../../contexts";
import SCHEMA from "../../schema";
import IdentityVerificationForm from "../IdentityVerificationForm";

function PasswordRecoveryRecover() {
  const formMethods = useForm({
    resolver: zodResolver(SCHEMA.password.recovery.recover),
  });

  const { recover, getEmail, getEmailData } =
    useUser().account.password.recovery;

  function handleOnSubmit(data: Omit<PasswordRecoveryRecoverData, "email">) {
    // we sure getEmailData in not undefined in this form
    return recover({ ...data, email: getEmailData!.email });
  }

  function handleOnResend() {
    return getEmail(getEmailData as PasswordRecoveryGetEmailData);
  }

  return (
    <IdentityVerificationForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={
        CONTENT.account.password.recovery.recover.submitButtonText
      }
      content={CONTENT.account.password.recovery.mainContent}
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

export default PasswordRecoveryRecover;
