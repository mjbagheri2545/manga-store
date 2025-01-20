import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";
import { Auth_UserAccountForm } from "@/components/ui/auth_user";

import { RegistrationData } from "../../api";
import AUTH_CONTENT from "../../constants/content";
import { useAuth } from "../../contexts";
import AUTH_SCHEMA from "../../schema";

function RegistrationForm() {
  const formMethods = useForm({
    resolver: zodResolver(AUTH_SCHEMA.registration),
  });
  const { register } = useAuth();

  function handleOnSubmit(data: RegistrationData) {
    return register(data);
  }

  return (
    <Auth_UserAccountForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={AUTH_CONTENT.registration.submitButtonText}
      content={AUTH_CONTENT.registration.mainContent}
    >
      <InputField controllerName="fullName" label="نام و نام خانوادگی" />
      <InputField
        controllerName="email"
        inputProps={{ type: "email" }}
        label="ایمیل"
      />
      <InputField
        controllerName="password"
        inputProps={{ type: "password" }}
        label="رمز عبور"
      />
      <InputField
        controllerName="passwordConfirmation"
        inputProps={{ type: "password" }}
        label="تایید رمز عبور"
      />
    </Auth_UserAccountForm>
  );
}

export default RegistrationForm;
