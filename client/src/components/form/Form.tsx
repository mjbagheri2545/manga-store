import React, { PropsWithChildren } from "react";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";
import { isFormField } from "@/utils";

import { Button } from "../utility";

export type FormProps<T extends FieldValues> = PropsWithChildren &
  PropsWithContainer<"form", false> & {
    formMethods: UseFormReturn<T>;
    handleOnSubmit: (data: T) => Promise<void>;
    handleOnFailure?: (error: FieldErrors) => void;
    submitButtonText: string;
  };

export function Form<T extends FieldValues>({
  formMethods,
  handleOnSubmit: onSubmit,
  handleOnFailure: onFailure = console.log,
  children,
  submitButtonText,
  containerProps,
}: FormProps<T>) {
  const {
    formState: { isDirty, isValid, submitCount, isSubmitting },
    handleSubmit,
  } = formMethods;

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleSubmit(onSubmit, onFailure)(e);
  }

  const childrenLength = React.Children.count(children);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleOnSubmit} noValidate {...containerProps}>
        {React.Children.map(children, (child, index) => {
          const isFirstFormField = isFormField(child) && index === 0;

          if (isFirstFormField) {
            const newProps = {
              ...child.props,
              fieldProps: { ...child.props.fieldProps, autoFocus: true },
            };

            return React.cloneElement(child, newProps);
          }

          const isLastChild =
            React.isValidElement(child) && index === childrenLength - 1;

          if (isLastChild && "className" in child.props) {
            const newProps = {
              ...child.props,
              className: twMerge(child.props.className, "mb-0"),
            };

            return React.cloneElement(child, newProps);
          }

          return child;
        })}
        <Button
          type="submit"
          disabled={isDirty && !isValid && submitCount > 0}
          isLoading={isSubmitting}
          className="btn-block mt-10"
        >
          {submitButtonText}
        </Button>
      </form>
    </FormProvider>
  );
}
