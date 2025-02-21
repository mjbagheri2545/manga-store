import { CreateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import categoryApi from "../api";

function CreateCategoryForm() {
  return (
    <CreateEntityForm
      entityKey="category"
      createApi={categoryApi.create}
      schema={createProductGroupSchema}
      EntitiesContext={AdminProductGroupContext}
      getEntityFromData={(data) => data.category}
    >
      <ProductGroupFormFields />
    </CreateEntityForm>
  );
}

export default CreateCategoryForm;
