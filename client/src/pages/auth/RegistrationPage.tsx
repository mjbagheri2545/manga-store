import Auth_UserFormLayout from "@/components/ui/auth_user/Auth_UserFormLayout";
import RegistrationForm from "@/features/auth/components/forms/RegistrationForm";

function RegistrationPage() {
  return (
    <Auth_UserFormLayout>
      <RegistrationForm />
    </Auth_UserFormLayout>
  );
}

export default RegistrationPage;
