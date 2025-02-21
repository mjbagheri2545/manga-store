import { UpdateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import categoryApi from "../api";

function UpdateCategoryForm() {
  return (
    <UpdateEntityForm
      entityKey="category"
      api={categoryApi}
      schema={createProductGroupSchema}
      getFieldsDefaultValues={(data) => ({
        name: data.category.name,
        slug: data.category.slug,
      })}
      EntitiesContext={AdminProductGroupContext}
      getEntityFromData={(data) => data.category}
    >
      <ProductGroupFormFields />
    </UpdateEntityForm>
  );
}

export default UpdateCategoryForm;
