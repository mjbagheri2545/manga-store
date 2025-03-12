import React, { ComponentProps, useId } from "react";
import { useFormContext } from "react-hook-form";

import { PropsWithContainer } from "@/types";
import { cn } from "@/utils";

import Label from "./Label";

export type FormField_FieldChildrenProps = {
  id: string;
  isError: boolean;
  label?: string;
  isFullWidth?: boolean;
};

export type FormField_FieldProps = PropsWithContainer & {
  labelProps?: ComponentProps<"label">;
  label?: string;
  isRequired?: boolean;
  controllerName?: string;
  isMarginBottom?: boolean;
  isFullWidth?: boolean;
  children: (props: FormField_FieldChildrenProps) => React.ReactNode;
};

export function FormField_Field({
  controllerName,
  labelProps,
  containerProps,
  isRequired = true,
  isFullWidth = true,
  label,
  children,
}: FormField_FieldProps) {
  const { id, isError, errorMessage } = useFormField_Field(controllerName);

  const containerClassName = cn(
    "form-control",
    isFullWidth && "w-auto",
    containerProps?.className
  );

  return (
    <div {...containerProps} className={containerClassName}>
      {label != null && (
        <Label
          label={label}
          isRequired={isRequired}
          labelProps={labelProps}
          isError={isError}
          id={id}
        />
      )}
      {children({ id, isError, label, isFullWidth })}

      {isError && (
        <p className="text-error text-sm mx-1.5 mt-1 mb-3">
          {String(errorMessage)}
        </p>
      )}
    </div>
  );
}

function useFormField_Field(controllerName?: string) {
  const id = useId();

  const formContext = useFormContext();
  const error = formContext?.formState.errors[controllerName ?? ""];
  const isError = error?.type != null;
  const errorMessage = error?.message;

  return {
    id,
    isError,
    errorMessage,
  };
}
