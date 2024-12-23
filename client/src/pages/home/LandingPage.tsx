import Button from "@/components/utility/Button";
import { useAuth } from "@/features/auth/contexts";
import { useUser } from "@/features/user/contexts";

function LandingPage() {
  const { logout } = useAuth();
  const { reset } = useUser().account.password;

  async function passwordReset() {
    await reset({
      currentPassword: "BaGhErI2545@",
      newPassword: "@MjBdEvElOpEr2545@",
      newPasswordConfirmation: "@MjBdEvElOpEr2545@",
    });
  }

  return (
    <>
      <Button onClick={logout}>logout</Button>
      <Button onClick={passwordReset}>password reset</Button>
    </>
  );
}

export default LandingPage;
