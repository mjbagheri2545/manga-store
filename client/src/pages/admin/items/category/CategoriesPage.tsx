import { Button } from "@/components/utility";
import PATH from "@/constants/path";
import CategoryTable from "@/features/category/components/CategoryTable";

import AdminPageHeader from "../../components/PageHeader";
import AdminSection from "../../components/section";

function CategoriesPage() {
  return (
    <>
      <AdminPageHeader title="دسته بندی ها">
        <Button isLinkComponent to={PATH.admin.create("category")}>
          افزودن دسته بندی
        </Button>
      </AdminPageHeader>
      <AdminSection>
        <CategoryTable />
      </AdminSection>
    </>
  );
}

export default CategoriesPage;
