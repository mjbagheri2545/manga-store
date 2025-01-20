import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";
import { Auth_UserAccountForm } from "@/components/ui/auth_user";

import { LoginData } from "../../api";
import AUTH_CONTENT from "../../constants/content";
import { useAuth } from "../../contexts";
import AUTH_SCHEMA from "../../schema";

function LoginForm() {
  const formMethods = useForm({
    resolver: zodResolver(AUTH_SCHEMA.login),
  });
  const { login } = useAuth();

  function handleOnSubmit(data: LoginData) {
    return login(data);
  }

  return (
    <Auth_UserAccountForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButtonText={AUTH_CONTENT.login.submitButtonText}
      content={AUTH_CONTENT.login.mainContent}
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
    </Auth_UserAccountForm>
  );
}

export default LoginForm;
