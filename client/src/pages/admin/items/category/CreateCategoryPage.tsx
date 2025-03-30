import { Section } from "@/components/ui/layout";
import CreateCategoryForm from "@/features/category/components/CreateCategoryForm";

import CategoryPageHeader from "./CategoryPageHeader";

function CreateCategoryPage() {
  return (
    <>
      <CategoryPageHeader title="افزودن دسته بندی جدید" />
      <Section>
        <CreateCategoryForm />
      </Section>
    </>
  );
}

export default CreateCategoryPage;
