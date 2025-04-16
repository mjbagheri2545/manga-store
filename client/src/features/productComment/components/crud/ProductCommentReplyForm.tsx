import { FormProps } from "@/components/form";
import { useProduct } from "@/contexts/ProductContext";
import { parseApiResponse } from "@/utils";

import productCommentApi from "../../api";
import { useReplies } from "../../contexts/RepliesContext";
import { ProductCommentData } from "../../schemas";
import CreateProductCommentFormSubmitButton from "./CreateProductCommentFormSubmitButton";
import ProductCommentForm from "./ProductCommentForm";

type ProductCommentReplyFormProps = Pick<
  FormProps<ProductCommentData>,
  "onAfterSubmit"
> & {
  parentId: string;
  replyToId: string;
};

export function ProductCommentReplyForm({
  parentId,
  replyToId,
  onAfterSubmit,
}: ProductCommentReplyFormProps) {
  const { handleOnCreateReply } = useReplies();
  const product = useProduct();

  async function handleOnSubmit(data: ProductCommentData) {
    const response = await productCommentApi.reply({
      parentId,
      replyToId,
      data,
      productId: product.id,
    });

    parseApiResponse(response, ({ data }) => {
      handleOnCreateReply(data.reply);
    });
  }

  return (
    <ProductCommentForm
      handleOnSubmit={handleOnSubmit}
      submitButton={<CreateProductCommentFormSubmitButton className="!mt-2" />}
      containerProps={{ className: "w-full" }}
      placeholder="افزودن پاسخ ..."
      onAfterSubmit={onAfterSubmit}
    />
  );
}
