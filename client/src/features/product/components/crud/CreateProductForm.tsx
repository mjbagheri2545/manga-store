import { ApiComponent } from "@/components/ui/api";
import { CreateEntityForm } from "@/components/ui/form";
import { useProductGroups } from "@/contexts/ProductGroupsContext";
import { useProgress } from "@/contexts/ProgressContext";
import { createOnUploadProgress } from "@/utils";

import productApi, { ManagersResponse } from "../../api";
import { createProductSchema } from "../../schemas";
import ProductFormFields from "./productFormField";

function CreateProductForm() {
  return (
    <ApiComponent apiMethod={productApi.getManagers}>
      {(result) => <CreateProductFormChildren data={result.data} />}
    </ApiComponent>
  );
}

export default CreateProductForm;

type CreateProductFormChildrenProps = {
  data: ManagersResponse;
};

function CreateProductFormChildren({ data }: CreateProductFormChildrenProps) {
  const { categories, productStatuses } = useProductGroups();
  const { setProgress } = useProgress();

  return (
    <CreateEntityForm
      createMethod={({ data }) =>
        productApi.create({
          data,
          onUploadProgress: createOnUploadProgress(setProgress),
        })
      }
      entityKey="product"
      schema={createProductSchema}
      getIdFromData={(data) => data.id}
      useFormProps={{
        // other Inputs have default value automatically
        defaultValues: {
          productImage: undefined,
          tagsId: [],
          categoryId: categories[0].id,
          statusId: productStatuses[0].id,
          managerId: data.managers[0].id,
        },
      }}
      submitButton="افزودن محصول"
    >
      <ProductFormFields managers={data.managers} />
    </CreateEntityForm>
  );
}
