import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/form";
import { Auth_UserAccountForm } from "@/components/ui/auth_user";
import { useAuth } from "@/contexts/AuthContext";
import { LoginData, loginSchema } from "@/schemas/auth.schema";

import AUTH_CONTENT from "../../constants/content";

function LoginForm() {
  const formMethods = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();

  function handleOnSubmit(data: LoginData) {
    login(data);
  }

  return (
    <Auth_UserAccountForm
      formMethods={formMethods}
      handleOnSubmit={handleOnSubmit}
      submitButton={AUTH_CONTENT.login.submitButtonText}
      content={AUTH_CONTENT.login.mainContent}
    >
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
    </Auth_UserAccountForm>
  );
}

export default LoginForm;
