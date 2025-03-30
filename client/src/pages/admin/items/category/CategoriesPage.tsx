import { PageHeader, Section } from "@/components/ui/layout";
import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import CategoriesTable from "@/features/category/components/CategoriesTable";

function CategoriesPage() {
  return (
    <>
      <PageHeader title="دسته بندی ها">
        <Button isLinkComponent to={PATH.admin.create("category")} isWide>
          افزودن دسته بندی
        </Button>
      </PageHeader>
      <Section>
        <CategoriesTable />
      </Section>
    </>
  );
}

export default CategoriesPage;
