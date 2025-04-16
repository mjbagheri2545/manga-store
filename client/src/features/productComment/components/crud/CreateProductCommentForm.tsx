import { useProduct } from "@/contexts/ProductContext";
import { parseApiResponse } from "@/utils";

import productCommentApi from "../../api";
import { useRootProductComments } from "../../contexts/RootProductCommentsContext";
import { ProductCommentData } from "../../schemas";
import CreateProductCommentFormSubmitButton from "./CreateProductCommentFormSubmitButton";
import ProductCommentForm from "./ProductCommentForm";

function CreateProductCommentForm() {
  const { handleOnCreateRootProductComment } = useRootProductComments();
  const product = useProduct();

  async function handleOnSubmit(data: ProductCommentData) {
    const response = await productCommentApi.create({
      data,
      productId: product.id,
    });

    parseApiResponse(response, ({ data }) => {
      handleOnCreateRootProductComment(data.rootProductComment);
    });
  }

  return (
    <ProductCommentForm
      handleOnSubmit={handleOnSubmit}
      submitButton={<CreateProductCommentFormSubmitButton className="!mt-4" />}
      onAfterSubmit={({ reset }) => reset()}
    />
  );
}

export default CreateProductCommentForm;
