import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";
import PATH from "@/constants/path";
import UserAccountPageWrapper from "@/pages/user/account/UserAccountPageWrapper";

const AccountVerificationVerifyForm = lazy(
  () =>
    import("@/features/user/components/account/AccountVerificationVerifyForm")
);
const PasswordRecoveryPage = lazy(
  () => import("@/pages/user/account/PasswordRecoveryPage")
);

function UserRouter() {
  return (
    <Routes>
      <Route element={<UserAccountPageWrapper />}>
        <Route
          path={PATH.user.account.password.recovery}
          element={
            <SuspenseWithSpinner key="passwordRecoveryPage">
              <PasswordRecoveryPage />
            </SuspenseWithSpinner>
          }
        />
        <Route
          path={PATH.user.account.verification}
          element={
            <SuspenseWithSpinner key="accountVerificationPage">
              <AccountVerificationVerifyForm />
            </SuspenseWithSpinner>
          }
        />
      </Route>
    </Routes>
  );
}

export default UserRouter;
