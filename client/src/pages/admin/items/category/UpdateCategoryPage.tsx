import { ApiIdComponent } from "@/components/ui/api";
import { Section } from "@/components/ui/layout";
import categoryApi from "@/features/category/api";
import UpdateCategoryForm from "@/features/category/components/UpdateCategoryForm";

import CategoryPageHeader from "./CategoryPageHeader";

function UpdateCategoryPage() {
  return (
    <>
      <CategoryPageHeader title="به‌روزرسانی دسته بندی" />
      <Section>
        <ApiIdComponent
          getByIdMethod={categoryApi.getById}
          entityName="دسته بندی"
        >
          {(data) => <UpdateCategoryForm {...data} />}
        </ApiIdComponent>
      </Section>
    </>
  );
}

export default UpdateCategoryPage;
