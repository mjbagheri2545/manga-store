import { ApiComponent } from "@/components/ui/api";
import { UpdateEntityForm } from "@/components/ui/form";
import { useProgress } from "@/contexts/ProgressContext";
import { createOnUploadProgress, pick } from "@/utils";

import productApi, { GetProductByIdResponse } from "../../api";
import { updateProductSchema } from "../../schemas";
import ProductFormFields from "./productFormField";

function UpdateProductForm({ product }: GetProductByIdResponse) {
  const { setProgress } = useProgress();

  const productDefaultData = pick(product, [
    "designer",
    "persianName",
    "name",
    "oneChapterPriceInToman",
    "releaseYear",
    "slug",
    "summary",
    "writer",
  ]);

  return (
    <UpdateEntityForm
      updateMethod={(options) =>
        productApi.update({
          ...options,
          onUploadProgress: createOnUploadProgress(setProgress),
        })
      }
      entityKey="product"
      schema={updateProductSchema}
      submitButton="به‌روزرسانی محصول"
      useFormProps={{
        defaultValues: {
          tagsId: product.tags.map((tag) => tag.id),
          statusId: product.status.id,
          categoryId: product.category.id,
          managerId: product.manager.id,
          productImage: undefined,
          ...productDefaultData,
        },
      }}
    >
      <ApiComponent apiMethod={productApi.getManagers}>
        {(data) => <ProductFormFields {...data} product={product} />}
      </ApiComponent>
    </UpdateEntityForm>
  );
}

export default UpdateProductForm;
