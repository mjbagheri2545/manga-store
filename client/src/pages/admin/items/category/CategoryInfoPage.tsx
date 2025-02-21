import CategoryInfo from "@/features/category/components/CategoryInfo";

import AdminSection from "../../components/section";
import { CategoryPageHeader } from "./CategoryPageHeader";

function CategoryInfoPage() {
  return (
    <>
      <CategoryPageHeader title="اطلاعات دسته بندی" />
      <AdminSection>
        <CategoryInfo />
      </AdminSection>
    </>
  );
}

export default CategoryInfoPage;
