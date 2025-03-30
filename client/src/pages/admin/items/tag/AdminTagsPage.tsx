import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import TagsTable from "@/features/tag/components/TagsTable";

function AdminTagsPage() {
  return (
    <>
      <PageHeader title="ژانر ها">
        <Button isLinkComponent to={PATH.admin.create("tag")} isWide>
          افزودن ژانر
        </Button>
      </PageHeader>
      <Section>
        <TagsTable />
      </Section>
    </>
  );
}

export default AdminTagsPage;
