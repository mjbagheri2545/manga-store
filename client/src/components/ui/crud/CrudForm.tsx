import { FieldValues, FormState, useForm, UseFormProps } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormProps } from "@/components/form";

export type CrudFormProps<T extends FieldValues> = Omit<
  FormProps<T>,
  "formMethods" | "handleOnSubmit"
> & {
  handleOnSubmit: (data: T, formState: FormState<T>) => Promise<void>;
  schema: z.Schema<T>;
  useFormProps?: UseFormProps<T>;
};

export function CrudForm<T extends FieldValues>({
  useFormProps,
  schema,
  handleOnSubmit,
  ...restProps
}: CrudFormProps<T>) {
  const formMethods = useForm<T>({
    ...useFormProps,
    resolver: zodResolver(schema),
  });

  function finalHandleOnSubmit(data: T) {
    return handleOnSubmit(data, formMethods.formState);
  }

  return (
    <Form
      formMethods={formMethods}
      handleOnSubmit={finalHandleOnSubmit}
      {...restProps}
    />
  );
}
