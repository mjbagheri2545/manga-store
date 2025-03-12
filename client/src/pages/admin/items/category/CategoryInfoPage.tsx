import { Section } from "@/components/ui/layout";
import CategoryInfo from "@/features/category/components/CategoryInfo";

import { CategoryPageHeader } from "./CategoryPageHeader";

function CategoryInfoPage() {
  return (
    <>
      <CategoryPageHeader title="اطلاعات دسته بندی" />
      <Section>
        <CategoryInfo />
      </Section>
    </>
  );
}

export default CategoryInfoPage;
