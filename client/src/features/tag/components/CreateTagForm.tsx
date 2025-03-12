import { CreateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import tagApi from "../api";

function CreateTagForm() {
  return (
    <CreateEntityForm
      entityKey="tag"
      createMethod={tagApi.create}
      schema={createProductGroupSchema}
      getIdFromData={(data) => data.id}
    >
      <ProductGroupFormFields />
    </CreateEntityForm>
  );
}

export default CreateTagForm;
