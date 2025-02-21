import { UpdateEntityForm } from "@/components/ui/form";
import { ProductGroupFormFields } from "@/components/ui/productGroup";
import { AdminProductGroupContext } from "@/contexts/AdminProductGroupContext";
import createProductGroupSchema from "@/schemas/productGroup.schema";

import tagApi from "../api";

function UpdateTagForm() {
  return (
    <UpdateEntityForm
      entityKey="tag"
      api={tagApi}
      schema={createProductGroupSchema}
      getFieldsDefaultValues={(data) => ({
        name: data.tag.name,
        slug: data.tag.slug,
      })}
      EntitiesContext={AdminProductGroupContext}
      getEntityFromData={(data) => data.tag}
    >
      <ProductGroupFormFields />
    </UpdateEntityForm>
  );
}

export default UpdateTagForm;
