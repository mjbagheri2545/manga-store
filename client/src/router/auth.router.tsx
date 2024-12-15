import { Navigate, Route, Routes } from "react-router-dom";

import PATH from "@/constants/path";
import LoginPage from "@/pages/auth/LoginPage";
import RegistrationPage from "@/pages/auth/RegistrationPage";

function AuthRouter() {
  return (
    <Routes>
      <Route index element={<Navigate to={PATH.auth.login} replace />} />
      <Route path="register" element={<RegistrationPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default AuthRouter;
