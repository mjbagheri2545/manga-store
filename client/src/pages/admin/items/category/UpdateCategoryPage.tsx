import { Section } from "@/components/ui/layout";
import UpdateCategoryForm from "@/features/category/components/UpdateCategoryForm";

import { CategoryPageHeader } from "./CategoryPageHeader";

function UpdateCategoryPage() {
  return (
    <>
      <CategoryPageHeader title="به‌روزرسانی دسته بندی" />
      <Section>
        <UpdateCategoryForm />
      </Section>
    </>
  );
}

export default UpdateCategoryPage;
