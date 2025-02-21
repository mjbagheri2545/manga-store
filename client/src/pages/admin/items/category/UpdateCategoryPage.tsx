import UpdateCategoryForm from "@/features/category/components/UpdateCategoryForm";

import AdminSection from "../../components/section";
import { CategoryPageHeader } from "./CategoryPageHeader";

function UpdateCategoryPage() {
  return (
    <>
      <CategoryPageHeader title="به‌روزرسانی دسته بندی" />
      <AdminSection>
        <UpdateCategoryForm />
      </AdminSection>
    </>
  );
}

export default UpdateCategoryPage;
