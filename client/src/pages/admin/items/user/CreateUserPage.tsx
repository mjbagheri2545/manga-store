import { Section } from "@/components/ui/layout";
import ProgressProvider from "@/components/ui/ProgressProvider";
import CreateUserForm from "@/features/user/components/crud/CreateUserForm";

import UserPageHeader from "./UserPageHeader";

function CreateUserPage() {
  return (
    <>
      <UserPageHeader title="افزودن کاربر جدید" />
      <Section>
        <ProgressProvider>
          <CreateUserForm />
        </ProgressProvider>
      </Section>
    </>
  );
}

export default CreateUserPage;
