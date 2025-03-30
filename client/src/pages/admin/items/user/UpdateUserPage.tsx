import { ApiIdComponent } from "@/components/ui/api";
import { Section } from "@/components/ui/layout";
import ProgressProvider from "@/components/ui/ProgressProvider";
import userCrudApi from "@/features/user/api/crud.api";
import UpdateUserForm from "@/features/user/components/crud/UpdateUserForm";

import UserPageHeader from "./UserPageHeader";

function UpdateUserPage() {
  return (
    <>
      <UserPageHeader title="به‌روزرسانی کاربر" />
      <Section>
        <ApiIdComponent getByIdMethod={userCrudApi.getById} entityName="کاربر">
          {(data) => (
            <ProgressProvider>
              <UpdateUserForm {...data} />
            </ProgressProvider>
          )}
        </ApiIdComponent>
      </Section>
    </>
  );
}

export default UpdateUserPage;
