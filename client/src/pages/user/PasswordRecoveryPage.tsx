import Auth_UserFormLayout from "@/components/ui/auth_user/Auth_UserFormLayout";
import PasswordRecoveryGetEmail from "@/features/user/components/forms/PasswordRecoveryGetEmail";
import PasswordRecoveryRecover from "@/features/user/components/forms/PasswordRecoveryRecover";
import { useUser } from "@/features/user/contexts";

function PasswordRecoveryPage() {
  const { getEmailData } = useUser().account.password.recovery;
  return (
    <Auth_UserFormLayout>
      {getEmailData == null ? (
        <PasswordRecoveryGetEmail />
      ) : (
        <PasswordRecoveryRecover />
      )}
    </Auth_UserFormLayout>
  );
}

export default PasswordRecoveryPage;
