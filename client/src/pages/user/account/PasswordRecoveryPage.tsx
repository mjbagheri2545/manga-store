import PasswordRecoveryGetEmailForm from "@/features/user/components/account/PasswordRecoveryGetEmailForm";
import PasswordRecoveryRecoverForm from "@/features/user/components/account/PasswordRecoveryRecoverForm";
import { useUserAccount } from "@/features/user/contexts/UserAccountContext";

function PasswordRecoveryPage() {
  const { getEmailData } = useUserAccount().password.recovery;
  return (
    <>
      {getEmailData == null ? (
        <PasswordRecoveryGetEmailForm />
      ) : (
        <PasswordRecoveryRecoverForm />
      )}
    </>
  );
}

export default PasswordRecoveryPage;
