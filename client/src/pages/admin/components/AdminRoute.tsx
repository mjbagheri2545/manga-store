import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import PATH from "@/constants/path";
import { useAuth } from "@/contexts/AuthContext";

function AdminRoute({ children }: PropsWithChildren) {
  const state = useAuth();

  return state.isLoggedIn && state.user.roles.includes("admin") ? (
    children
  ) : (
    <Navigate to={PATH.home.landingPage} />
  );
}

export default AdminRoute;
