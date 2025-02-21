import { InputField } from "@/components/form";

import { FormFieldsContainer } from "../form";

export function ProductGroupFormFields() {
  return (
    <FormFieldsContainer>
      <InputField controllerName="name" label="اسم" />
      <InputField controllerName="slug" label="آدرس اینترنتی" />
    </FormFieldsContainer>
  );
}
