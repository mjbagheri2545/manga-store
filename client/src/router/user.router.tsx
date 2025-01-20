import { Route, Routes } from "react-router-dom";

import PATH from "@/constants/path";
import AccountVerificationVerifyForm from "@/features/user/components/account/AccountVerificationVerifyForm";
import PasswordRecoveryPage from "@/pages/user/account/PasswordRecoveryPage";
import UserAccountPage from "@/pages/user/account/UserAccountPage";

function UserRouter() {
  return (
    <Routes>
      <Route element={<UserAccountPage />}>
        <Route
          path={PATH.user.account.password.recovery}
          element={<PasswordRecoveryPage />}
        />
        <Route
          path={PATH.user.account.verification}
          element={<AccountVerificationVerifyForm />}
        />
      </Route>
    </Routes>
  );
}

export default UserRouter;
