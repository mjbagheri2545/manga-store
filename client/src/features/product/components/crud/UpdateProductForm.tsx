import ApiComponent from "@/components/ui/ApiComponent";
import { UpdateEntityForm } from "@/components/ui/form";
import { useProgress } from "@/contexts/ProgressContext";
import { createOnUploadProgress, pick } from "@/utils";

import productApi, { ManagersResponse } from "../../api";
import { updateProductSchema } from "../../schema";
import ProductFormFields from "./productFormField";

function UpdateProductForm() {
  return (
    <ApiComponent apiMethod={productApi.getManagers}>
      {(result) => <UpdateProductFormChildren data={result.data} />}
    </ApiComponent>
  );
}

export default UpdateProductForm;

type UpdateProductFormChildrenProps = {
  data: ManagersResponse;
};

function UpdateProductFormChildren({ data }: UpdateProductFormChildrenProps) {
  const { setProgress } = useProgress();

  return (
    <UpdateEntityForm
      api={{
        getById: productApi.getById,
        update: (options) =>
          productApi.update({
            ...options,
            onUploadProgress: createOnUploadProgress(setProgress),
          }),
      }}
      entityKey="product"
      schema={updateProductSchema}
      submitButton="به‌روزرسانی محصول"
      getFieldsDefaultValues={({ product }) => {
        const productDefaultData = pick(product, [
          "designer",
          "persianName",
          "name",
          "priceInRials",
          "releaseYear",
          "slug",
          "summary",
          "writer",
        ]);

        return {
          tagsId: product.tags.map((tag) => tag.id),
          statusId: product.status.id,
          categoryId: product.category.id,
          managerId: product.manager.id,
          productImage: undefined,
          ...productDefaultData,
        };
      }}
    >
      {({ product }) => (
        <ProductFormFields managers={data.managers} product={product} />
      )}
    </UpdateEntityForm>
  );
}
