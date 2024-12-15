import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";
import CONTENT from "@/constants/content";

import { RegistrationData } from "../../api";
import { useAuth } from "../../contexts";
import schema from "../../schema";
import AuthForm from "../AuthForm";

function RegistrationForm() {
  const formMethods = useForm({ resolver: zodResolver(schema.registration) });
  const { register } = useAuth();

  function handleOnSubmit(data: RegistrationData) {
    return register(data);
  }

  return (
    <AuthForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={CONTENT.auth.registration.submitButtonText}
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
    </AuthForm>
  );
}

export default RegistrationForm;
