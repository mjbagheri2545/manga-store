import { UpdateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";
import { ProductGroup } from "@/types";

import categoryApi from "../api";

type UpdateCategoryFormProps = {
  category: ProductGroup;
};

function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  return (
    <UpdateEntityForm
      entityKey="category"
      updateMethod={categoryApi.update}
      schema={createProductGroupSchema}
      useFormProps={{
        defaultValues: { name: category.name, slug: category.slug },
      }}
    >
      <ProductGroupFormFields />
    </UpdateEntityForm>
  );
}

export default UpdateCategoryForm;
