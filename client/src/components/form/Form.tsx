import React, { ComponentProps, PropsWithChildren } from "react";
import { FieldErrors, FormProvider, UseFormReturn } from "react-hook-form";

import Button from "../utility/Button";

export type FormProps = PropsWithChildren & {
  containerProps?: Omit<ComponentProps<"form">, "children">;
  formMethods: UseFormReturn;
  handleOnSubmit: (data: any) => Promise<void>;
  handleOnFailure?: (error: FieldErrors) => void;
  submitButtonText: string;
};

function Form({
  formMethods,
  handleOnSubmit: onSubmit,
  handleOnFailure: onFailure = console.log,
  children,
  submitButtonText,
  containerProps,
}: FormProps) {
  const {
    formState: { isDirty, isValid, submitCount, isSubmitting },
    handleSubmit,
  } = formMethods;

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleSubmit(onSubmit, onFailure)(e);
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleOnSubmit} noValidate {...containerProps}>
        {children}
        <Button
          type="submit"
          disabled={isDirty && !isValid && submitCount > 0}
          isLoading={isSubmitting}
          className="btn-block mt-6 mb-4"
        >
          {submitButtonText}
        </Button>
      </form>
    </FormProvider>
  );
}

export default Form;
