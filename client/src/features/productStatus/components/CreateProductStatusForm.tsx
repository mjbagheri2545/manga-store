import { CreateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import productStatusApi from "../api";

function CreateProductStatusForm() {
  return (
    <CreateEntityForm
      entityKey="productStatus"
      createMethod={productStatusApi.create}
      schema={createProductGroupSchema}
      getIdFromData={(data) => data.id}
    >
      <ProductGroupFormFields />
    </CreateEntityForm>
  );
}

export default CreateProductStatusForm;
