import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";
import PATH from "@/constants/path";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegistrationPage = lazy(() => import("@/pages/auth/RegistrationPage"));

function AuthRouter() {
  return (
    <Routes>
      <Route index element={<Navigate to={PATH.auth.login} replace />} />
      <Route
        path="register"
        element={
          <SuspenseWithSpinner key="registrationPage">
            <RegistrationPage />
          </SuspenseWithSpinner>
        }
      />
      <Route
        path="login"
        element={
          <SuspenseWithSpinner key="loginPage">
            <LoginPage />
          </SuspenseWithSpinner>
        }
      />
    </Routes>
  );
}

export default AuthRouter;
