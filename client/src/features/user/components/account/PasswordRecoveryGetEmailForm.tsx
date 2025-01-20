import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";
import { Auth_UserAccountForm } from "@/components/ui/auth_user";

import { PasswordRecoveryGetEmailData } from "../../api/account.api";
import USER_CONTENT from "../../constants/content";
import { useUserAccount } from "../../contexts/UserAccountContext";
import USER_ACCOUNT_SCHEMA from "../../schema/account.schema";
import FormNoticeText from "./FormNoticeText";

function PasswordRecoveryGetEmailForm() {
  const formMethods = useForm({
    resolver: zodResolver(USER_ACCOUNT_SCHEMA.password.recovery.getEmail),
  });

  const { getEmail } = useUserAccount().password.recovery;

  function handleOnSubmit(data: PasswordRecoveryGetEmailData) {
    return getEmail(data);
  }

  return (
    <Auth_UserAccountForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={
        USER_CONTENT.account.password.recovery.getEmail.submitButtonText
      }
      content={USER_CONTENT.account.password.recovery.mainContent}
    >
      <FormNoticeText>
        {USER_CONTENT.account.password.recovery.getEmail.noticeText}
      </FormNoticeText>
      <InputField controllerName="email" label="ایمیل" />
    </Auth_UserAccountForm>
  );
}

export default PasswordRecoveryGetEmailForm;
