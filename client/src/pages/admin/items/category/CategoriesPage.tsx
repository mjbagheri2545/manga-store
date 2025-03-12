import { Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import CategoriesTable from "@/features/category/components/CategoriesTable";

import AdminPageHeader from "../../components/PageHeader";

function CategoriesPage() {
  return (
    <>
      <AdminPageHeader title="دسته بندی ها">
        <Button isLinkComponent to={PATH.admin.create("category")}>
          افزودن دسته بندی
        </Button>
      </AdminPageHeader>
      <Section>
        <CategoriesTable />
      </Section>
    </>
  );
}

export default CategoriesPage;
