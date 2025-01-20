import { Button } from "@/components/utility";
import { useAuth } from "@/features/auth/contexts";

function LandingPage() {
  const { logout } = useAuth();

  return (
    <>
      <Button onClick={logout}>logout</Button>
    </>
  );
}

export default LandingPage;
