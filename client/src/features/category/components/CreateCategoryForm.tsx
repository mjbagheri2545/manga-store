import { CreateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import categoryApi from "../api";

function CreateCategoryForm() {
  return (
    <CreateEntityForm
      entityKey="category"
      createMethod={categoryApi.create}
      schema={createProductGroupSchema}
      getIdFromData={(data) => data.id}
    >
      <ProductGroupFormFields />
    </CreateEntityForm>
  );
}

export default CreateCategoryForm;
