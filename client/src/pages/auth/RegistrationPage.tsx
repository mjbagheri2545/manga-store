import { Auth_UserAccountFormLayout } from "@/components/ui/auth_user";
import RegistrationForm from "@/features/auth/components/forms/RegistrationForm";

function RegistrationPage() {
  return (
    <Auth_UserAccountFormLayout>
      <RegistrationForm />
    </Auth_UserAccountFormLayout>
  );
}

export default RegistrationPage;
