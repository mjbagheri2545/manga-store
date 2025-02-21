import React, { ComponentProps } from "react";

import { cn, labelToPlaceholder } from "@/utils";

import { FormField, FormFieldChildrenProps, FormFieldProps } from "./formField";

export type InputFieldProps = Omit<FormFieldProps, "children"> & {
  fieldProps?: ComponentProps<"input">;
};

export function InputField({ fieldProps, ...restProps }: InputFieldProps) {
  return (
    <FormField {...restProps}>
      {(formFieldChildrenProps) => (
        <InputFieldChildren
          {...formFieldChildrenProps}
          fieldProps={fieldProps}
        />
      )}
    </FormField>
  );
}

type InputFieldChildrenProps = FormFieldChildrenProps & {
  fieldProps?: ComponentProps<"input">;
};

function InputFieldChildren({
  isFullWidth,
  isError,
  id,
  label,
  onChange,
  fieldProps,
  ...restChildrenProps
}: InputFieldChildrenProps) {
  const className = cn(
    "input rounded placeholder-white/40 border-none pb-[0.7rem] bg-[#FFFFFF17]",
    isFullWidth && "w-full",
    isError ? "input-error" : "input-primary",
    fieldProps?.className
  );

  const placeholder = fieldProps?.placeholder ?? labelToPlaceholder(label);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
    fieldProps?.onChange?.(e);
  }

  return (
    <input
      type="text"
      {...fieldProps}
      {...restChildrenProps}
      placeholder={placeholder}
      className={className}
      onChange={handleOnChange}
    />
  );
}
