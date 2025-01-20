import { Auth_UserAccountFormLayout } from "@/components/ui/auth_user";
import LoginForm from "@/features/auth/components/forms/LoginForm";

function LoginPage() {
  return (
    <Auth_UserAccountFormLayout>
      <LoginForm />
    </Auth_UserAccountFormLayout>
  );
}

export default LoginPage;
