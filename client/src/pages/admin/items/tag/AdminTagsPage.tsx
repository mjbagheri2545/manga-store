import { Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import TagsTable from "@/features/tag/components/TagsTable";

import AdminPageHeader from "../../components/PageHeader";

function AdminTagsPage() {
  return (
    <>
      <AdminPageHeader title="ژانر ها">
        <Button isLinkComponent to={PATH.admin.create("tag")}>
          افزودن ژانر
        </Button>
      </AdminPageHeader>
      <Section>
        <TagsTable />
      </Section>
    </>
  );
}

export default AdminTagsPage;
