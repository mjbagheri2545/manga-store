import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import PATH from "@/constants/path";
import { useAuth } from "@/contexts/AuthContext";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to={PATH.auth.login} />;
}

export default ProtectedRoute;
