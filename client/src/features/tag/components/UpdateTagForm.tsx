import { UpdateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import createProductGroupSchema from "@/schemas/productGroup.schema";
import { ProductGroup } from "@/types";

import tagApi from "../api";

type UpdateTagFormProps = {
  tag: ProductGroup;
};

function UpdateTagForm({ tag }: UpdateTagFormProps) {
  return (
    <UpdateEntityForm
      entityKey="tag"
      updateMethod={tagApi.update}
      schema={createProductGroupSchema}
      useFormProps={{
        defaultValues: {
          name: tag.name,
          slug: tag.slug,
        },
      }}
    >
      <ProductGroupFormFields />
    </UpdateEntityForm>
  );
}

export default UpdateTagForm;
