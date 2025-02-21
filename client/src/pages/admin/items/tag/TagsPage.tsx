import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import TagTable from "@/features/tag/components/TagTable";

import AdminPageHeader from "../../components/PageHeader";
import AdminSection from "../../components/section";

function TagsPage() {
  return (
    <>
      <AdminPageHeader title="ژانر ها">
        <Button isLinkComponent to={PATH.admin.create("tag")}>
          افزودن ژانر
        </Button>
      </AdminPageHeader>
      <AdminSection>
        <TagTable />
      </AdminSection>
    </>
  );
}

export default TagsPage;
