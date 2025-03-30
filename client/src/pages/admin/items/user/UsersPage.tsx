import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import UsersTable from "@/features/user/components/crud/UsersTable";

function UsersPage() {
  return (
    <>
      <PageHeader title="کاربر ها">
        <Button isLinkComponent to={PATH.admin.create("user")} isWide>
          افزودن کاربر
        </Button>
      </PageHeader>
      <Section>
        <UsersTable />
      </Section>
    </>
  );
}

export default UsersPage;
