import React, { ComponentProps, useId } from "react";
import { useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer } from "@/types";

import Label from "./Label";

export type FormField_FieldChildrenProps = {
  id: string;
  isError: boolean;
  label: string;
  isFullWidth?: boolean;
};

export type FormField_FieldProps = PropsWithContainer & {
  labelProps?: ComponentProps<"label">;
  label: string;
  isRequired?: boolean;
  controllerName: string;
  isMarginBottom?: boolean;
  isFullWidth?: boolean;
  children: (props: FormField_FieldChildrenProps) => React.ReactNode;
};

function FormField_Field({
  controllerName,
  labelProps,
  containerProps,
  isRequired = true,
  isMarginBottom = true,
  isFullWidth = true,
  label,
  children,
}: FormField_FieldProps) {
  const { id, isError, errorMessage } = useFormField_Field(controllerName);

  const containerMarginClassName = isMarginBottom && !isError ? "mb-4" : "";

  return (
    <div
      {...containerProps}
      className={twMerge(
        `form-control ${containerMarginClassName} ${isFullWidth ? "w-auto" : ""}`,
        containerProps?.className
      )}
    >
      <Label
        label={label}
        isRequired={isRequired}
        labelProps={labelProps}
        isError={isError}
        id={id}
      />
      {children({ id, isError, label, isFullWidth })}
      {isError ? (
        <p className="text-error text-sm mx-1.5 mt-1 mb-3">
          {errorMessage as string}
        </p>
      ) : null}
    </div>
  );
}

export default FormField_Field;

function useFormField_Field(controllerName: string) {
  const id = useId();

  const { formState } = useFormContext();
  const error = formState.errors[controllerName];
  const isError = error?.type != null;
  const errorMessage = error?.message;

  return {
    id,
    isError,
    errorMessage,
  };
}
