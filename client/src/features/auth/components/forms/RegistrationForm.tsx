import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";
import Auth_UserForm from "@/components/ui/auth_user/Auth_UserForm";

import { RegistrationData } from "../../api";
import CONTENT from "../../constants/content";
import { useAuth } from "../../contexts";
import SCHEMA from "../../schema";

function RegistrationForm() {
  const formMethods = useForm({ resolver: zodResolver(SCHEMA.registration) });
  const { register } = useAuth();

  function handleOnSubmit(data: RegistrationData) {
    return register(data);
  }

  return (
    <Auth_UserForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={CONTENT.registration.submitButtonText}
      content={CONTENT.registration.mainContent}
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
    </Auth_UserForm>
  );
}

export default RegistrationForm;
