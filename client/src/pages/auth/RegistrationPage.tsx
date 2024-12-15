import { toast } from "react-toastify";

import CONTENT from "@/constants/content";
import RegistrationForm from "@/features/auth/components/forms/RegistrationForm";

import AuthPage from "./AuthPage";

function RegistrationPage() {
  toast.error("asasd");
  return (
    <AuthPage content={CONTENT.auth.registration.mainContent}>
      <RegistrationForm />
    </AuthPage>
  );
}

export default RegistrationPage;
