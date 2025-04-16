import { Outlet } from "react-router-dom";

import UserAccountFormLayout from "@/features/user/components/account/UserAccountFormLayout";

function UserAccountPageWrapper() {
  return (
    <UserAccountFormLayout>
      <Outlet />
    </UserAccountFormLayout>
  );
}

export default UserAccountPageWrapper;
