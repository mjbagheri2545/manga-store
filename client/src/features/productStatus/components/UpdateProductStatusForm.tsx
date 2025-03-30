import { UpdateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";
import { ProductGroup } from "@/types";

import productStatusApi from "../api";

type UpdateProductStatusFormProps = {
  productStatus: ProductGroup;
};

function UpdateProductStatusForm({
  productStatus,
}: UpdateProductStatusFormProps) {
  return (
    <UpdateEntityForm
      entityKey="productStatus"
      updateMethod={productStatusApi.update}
      schema={createProductGroupSchema}
      useFormProps={{
        defaultValues: {
          name: productStatus.name,
          slug: productStatus.slug,
        },
      }}
    >
      <ProductGroupFormFields />
    </UpdateEntityForm>
  );
}

export default UpdateProductStatusForm;
