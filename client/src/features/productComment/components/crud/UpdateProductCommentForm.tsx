import { SubmitButton } from "@/components/form";
import { Button } from "@/components/utility";
import {
  GetAllRootProductCommentBase,
  useProduct,
} from "@/contexts/ProductContext";
import { parseApiResponse } from "@/utils";

import productCommentApi from "../../api";
import { ProductCommentData } from "../../schemas";
import ProductCommentForm from "./ProductCommentForm";

type UpdateProductCommentFormProps<T> = {
  productComment: T;
  onSuccessful: (data: ProductCommentData) => void;
  onCancel: () => void;
};

function UpdateProductCommentForm<T extends GetAllRootProductCommentBase>({
  productComment,
  onSuccessful,
  onCancel,
}: UpdateProductCommentFormProps<T>) {
  const product = useProduct();

  async function handleOnSubmit(data: ProductCommentData) {
    const response = await productCommentApi.update({
      id: productComment.id,
      data,
      productId: product.id,
    });

    parseApiResponse(response, () => {
      onSuccessful(data);
    });
  }

  return (
    <ProductCommentForm
      handleOnSubmit={handleOnSubmit}
      containerProps={{ className: "w-full" }}
      submitButton={
        <div className="flex justify-end gap-4 mt-4">
          <Button type="button" className="btn-error" isWide onClick={onCancel}>
            لغو
          </Button>
          <SubmitButton isWide className="!mt-0">
            ویرایش
          </SubmitButton>
        </div>
      }
      useFormProps={{ defaultValues: { message: productComment.message } }}
    />
  );
}

export default UpdateProductCommentForm;
