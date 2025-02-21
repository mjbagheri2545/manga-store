import { CreateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import productStatusApi from "../api";

function CreateProductStatusForm() {
  return (
    <CreateEntityForm
      entityKey="productStatus"
      createApi={productStatusApi.create}
      schema={createProductGroupSchema}
      EntitiesContext={AdminProductGroupContext}
      getEntityFromData={(data) => data.productStatus}
    >
      <ProductGroupFormFields />
    </CreateEntityForm>
  );
}

export default CreateProductStatusForm;
