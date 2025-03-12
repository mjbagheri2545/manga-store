import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";
import { Auth_UserAccountForm } from "@/components/ui/auth_user";

import USER_CONTENT from "../../constants/content";
import { useUserAccount } from "../../contexts/UserAccountContext";
import { GetEmailData, getEmailSchema } from "../../schemas/account.schema";
import FormNoticeText from "./FormNoticeText";

function PasswordRecoveryGetEmailForm() {
  const formMethods = useForm<GetEmailData>({
    resolver: zodResolver(getEmailSchema),
  });

  const { getEmail } = useUserAccount().password.recovery;

  function handleOnSubmit(data: GetEmailData) {
    return getEmail(data);
  }

  return (
    <Auth_UserAccountForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButton={
        USER_CONTENT.account.password.recovery.getEmail.submitButtonText
      }
      content={USER_CONTENT.account.password.recovery.mainContent}
    >
      <FormNoticeText>
        {USER_CONTENT.account.password.recovery.getEmail.noticeText}
      </FormNoticeText>
      <InputField
        controllerName="email"
        label="ایمیل"
        fieldProps={{ type: "email" }}
      />
    </Auth_UserAccountForm>
  );
}

export default PasswordRecoveryGetEmailForm;
