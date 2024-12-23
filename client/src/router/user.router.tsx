import { Route, Routes } from "react-router-dom";

import PasswordRecoveryPage from "@/pages/user/PasswordRecoveryPage";
import VerificationVerifyPage from "@/pages/user/VerificationVerifyPage";

function UserRouter() {
  return (
    <Routes>
      <Route
        path="account/password/recovery"
        element={<PasswordRecoveryPage />}
      />
      <Route path="account/verification" element={<VerificationVerifyPage />} />
    </Routes>
  );
}

export default UserRouter;
