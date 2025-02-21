import { Button } from "@/components/utility";
import { useAuth } from "@/contexts/AuthContext";

function LandingPage() {
  const { logout } = useAuth();

  return (
    <>
      <Button onClick={logout}>logout</Button>
    </>
  );
}

export default LandingPage;
