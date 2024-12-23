import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/form/inputField";
import Auth_UserForm from "@/components/ui/auth_user/Auth_UserForm";

import { LoginData } from "../../api";
import CONTENT from "../../constants/content";
import { useAuth } from "../../contexts";
import SCHEMA from "../../schema";

function LoginForm() {
  const formMethods = useForm({
    resolver: zodResolver(SCHEMA.login),
  });
  const { login } = useAuth();

  function handleOnSubmit(data: LoginData) {
    return login(data);
  }

  return (
    <Auth_UserForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={CONTENT.login.submitButtonText}
      content={CONTENT.login.mainContent}
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
    </Auth_UserForm>
  );
}

export default LoginForm;
