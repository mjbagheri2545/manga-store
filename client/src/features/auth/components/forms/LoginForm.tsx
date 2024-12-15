import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";
import CONTENT from "@/constants/content";

import { LoginData } from "../../api";
import { useAuth } from "../../contexts";
import schema from "../../schema";
import AuthForm from "../AuthForm";

function LoginForm() {
  const formMethods = useForm({
    resolver: zodResolver(schema.login),
  });
  const { login } = useAuth();

  function handleOnSubmit(data: LoginData) {
    return login(data);
  }

  return (
    <AuthForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={CONTENT.auth.login.submitButtonText}
    >
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
    </AuthForm>
  );
}

export default LoginForm;
