import React, { PropsWithChildren } from "react";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";
import { isInputField } from "@/utils";

import { SubmitButton } from "./SubmitButton";

export type FormProps<T extends FieldValues> = PropsWithChildren &
  PropsWithContainer<"form"> & {
    formMethods: UseFormReturn<T>;
    handleOnSubmit: (data: T) => Promise<void> | void;
    handleOnFailure?: (error: FieldErrors) => void;
    submitButton: React.JSX.Element | string;
    onAfterSubmit?: (formMethods: UseFormReturn<T>) => void;
  };

export function Form<T extends FieldValues>({
  formMethods,
  handleOnSubmit: onSubmit,
  handleOnFailure: onFailure = (error) => {
    console.log(error);
  },
  children,
  containerProps,
  submitButton,
  onAfterSubmit,
}: FormProps<T>) {
  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    formMethods.handleSubmit(onSubmit, onFailure)(e);
    onAfterSubmit?.(formMethods);
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleOnSubmit}
        noValidate
        {...containerProps}
        className={twMerge("space-y-4", containerProps?.className)}
      >
        {React.Children.map(children, (child, index) => {
          const isFirstInputField = isInputField(child) && index === 0;

          if (isFirstInputField) {
            const newProps = {
              ...child.props,
              fieldProps: { autoFocus: true, ...child.props.fieldProps },
            };

            return React.cloneElement(child, newProps);
          }

          return child;
        })}
        {typeof submitButton === "string" ? (
          <SubmitButton>{submitButton}</SubmitButton>
        ) : (
          submitButton
        )}
      </form>
    </FormProvider>
  );
}
