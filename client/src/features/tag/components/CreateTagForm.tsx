import { CreateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import tagApi from "../api";

function CreateTagForm() {
  return (
    <CreateEntityForm
      entityKey="tag"
      createApi={tagApi.create}
      schema={createProductGroupSchema}
      EntitiesContext={AdminProductGroupContext}
      getEntityFromData={(data) => data.tag}
    >
      <ProductGroupFormFields />
    </CreateEntityForm>
  );
}

export default CreateTagForm;
