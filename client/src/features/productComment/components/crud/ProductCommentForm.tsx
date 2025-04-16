import { TextareaField } from "@/components/form";
import { CrudForm, CrudFormProps } from "@/components/ui/crud";

import { ProductCommentData, productCommentSchema } from "../../schemas";

type ProductCommentFormProps = Pick<
  CrudFormProps<ProductCommentData>,
  | "handleOnSubmit"
  | "submitButton"
  | "useFormProps"
  | "containerProps"
  | "onAfterSubmit"
> & {
  placeholder?: string;
};

function ProductCommentForm({
  placeholder,
  ...restProps
}: ProductCommentFormProps) {
  return (
    <CrudForm schema={productCommentSchema} {...restProps}>
      <TextareaField
        controllerName="message"
        fieldProps={{ placeholder: placeholder ?? "افزودن دیدگاه ..." }}
      />
    </CrudForm>
  );
}

export default ProductCommentForm;
