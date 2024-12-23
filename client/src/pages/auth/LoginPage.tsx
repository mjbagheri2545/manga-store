import Auth_UserFormLayout from "@/components/ui/auth_user/Auth_UserFormLayout";
import LoginForm from "@/features/auth/components/forms/LoginForm";

function LoginPage() {
  return (
    <Auth_UserFormLayout>
      <LoginForm />
    </Auth_UserFormLayout>
  );
}

export default LoginPage;
