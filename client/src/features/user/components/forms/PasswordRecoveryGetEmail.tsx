import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";
import Auth_UserForm from "@/components/ui/auth_user/Auth_UserForm";

import { PasswordRecoveryGetEmailData } from "../../api/account.api";
import CONTENT from "../../constants/content";
import { useUser } from "../../contexts";
import SCHEMA from "../../schema";
import FormNoticeText from "../FormNoticeText";

function PasswordRecoveryGetEmail() {
  const formMethods = useForm({
    resolver: zodResolver(SCHEMA.password.recovery.getEmail),
  });

  const { getEmail } = useUser().account.password.recovery;

  function handleOnSubmit(data: PasswordRecoveryGetEmailData) {
    return getEmail(data);
  }

  return (
    <Auth_UserForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={
        CONTENT.account.password.recovery.getEmail.submitButtonText
      }
      content={CONTENT.account.password.recovery.mainContent}
    >
      <FormNoticeText>
        {CONTENT.account.password.recovery.getEmail.noticeText}
      </FormNoticeText>
      <InputField controllerName="email" label="ایمیل" />
    </Auth_UserForm>
  );
}

export default PasswordRecoveryGetEmail;
