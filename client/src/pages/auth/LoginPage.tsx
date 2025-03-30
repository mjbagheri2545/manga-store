import { Auth_UserAccountFormLayout } from "@/components/ui/auth_user";
import LoginForm from "@/features/auth/components/forms/LoginForm";

function LoginPage() {
  return (
    <Auth_UserAccountFormLayout>
      <div dir="ltr" className="px-4">
        <p className="text-center text-wrap mb-4">
          for testing application and admin page use this account
        </p>
        <div className="flex flex-col items-center justify-between mb-4">
          <span>email: javadbagheri25452545@gmail.com</span>
          <span>password: devPassword</span>
        </div>
      </div>
      <LoginForm />
    </Auth_UserAccountFormLayout>
  );
}

export default LoginPage;
