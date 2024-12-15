import CONTENT from "@/constants/content";
import LoginForm from "@/features/auth/components/forms/LoginForm";

import AuthPage from "./AuthPage";

function LoginPage() {
  return (
    <AuthPage content={CONTENT.auth.login.mainContent}>
      <LoginForm />
    </AuthPage>
  );
}

export default LoginPage;
