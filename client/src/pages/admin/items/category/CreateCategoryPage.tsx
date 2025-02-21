import CreateCategoryForm from "@/features/category/components/CreateCategoryForm";

import AdminSection from "../../components/section";
import { CategoryPageHeader } from "./CategoryPageHeader";

function CreateCategoryPage() {
  return (
    <>
      <CategoryPageHeader title="افزودن دسته بندی جدید" />
      <AdminSection>
        <CreateCategoryForm />
      </AdminSection>
    </>
  );
}

export default CreateCategoryPage;
