import { UpdateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import productStatusApi from "../api";

function UpdateProductStatusForm() {
  return (
    <UpdateEntityForm
      entityKey="productStatus"
      api={productStatusApi}
      schema={createProductGroupSchema}
      getFieldsDefaultValues={(data) => ({
        name: data.productStatus.name,
        slug: data.productStatus.slug,
      })}
      getEntityFromData={(data) => data.productStatus}
    >
      <ProductGroupFormFields />
    </UpdateEntityForm>
  );
}

export default UpdateProductStatusForm;
