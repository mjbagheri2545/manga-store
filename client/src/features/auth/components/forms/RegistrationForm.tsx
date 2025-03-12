import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";
import { Auth_UserAccountForm } from "@/components/ui/auth_user";
import { useAuth } from "@/contexts/AuthContext";
import { RegistrationData, registrationSchema } from "@/schemas/auth.schema";

import AUTH_CONTENT from "../../constants/content";

function RegistrationForm() {
  const formMethods = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });
  const { register } = useAuth();

  function handleOnSubmit(data: RegistrationData) {
    register(data);
  }

  return (
    <Auth_UserAccountForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButton={AUTH_CONTENT.registration.submitButtonText}
      content={AUTH_CONTENT.registration.mainContent}
    >
      <InputField controllerName="fullName" label="نام و نام خانوادگی" />
      <InputField
        controllerName="email"
        fieldProps={{ type: "email" }}
        label="ایمیل"
      />
      <InputField
        controllerName="password"
        fieldProps={{ type: "password" }}
        label="رمز عبور"
      />
      <InputField
        controllerName="passwordConfirmation"
        fieldProps={{ type: "password" }}
        label="تایید رمز عبور"
      />
    </Auth_UserAccountForm>
  );
}

export default RegistrationForm;
