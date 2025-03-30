import { Section } from "@/components/ui/layout";
import UserInfo from "@/features/user/components/crud/UserInfo";

import UserPageHeader from "./UserPageHeader";

function UserInfoPage() {
  return (
    <>
      <UserPageHeader title="اطلاعات کاربر" />
      <Section>
        <UserInfo />
      </Section>
    </>
  );
}

export default UserInfoPage;
