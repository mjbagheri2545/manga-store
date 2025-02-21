import React, { ComponentProps } from "react";

import { cn, labelToPlaceholder } from "@/utils";

import { FormField, FormFieldChildrenProps, FormFieldProps } from "./formField";

type TextareaFieldProps = Omit<FormFieldProps, "children"> & {
  fieldProps?: ComponentProps<"textarea">;
};

export function TextareaField({
  fieldProps,
  ...restProps
}: TextareaFieldProps) {
  return (
    <FormField {...restProps}>
      {(formFieldChildrenProps) => (
        <TextareaFieldChildren
          {...formFieldChildrenProps}
          fieldProps={fieldProps}
        />
      )}
    </FormField>
  );
}

type TextareaFieldChildrenProps = FormFieldChildrenProps & {
  fieldProps?: ComponentProps<"textarea">;
};

function TextareaFieldChildren({
  isFullWidth,
  isError,
  id,
  label,
  onChange,
  fieldProps,
  ...restChildrenProps
}: TextareaFieldChildrenProps) {
  const className = cn(
    "textarea rounded placeholder-white/40 border-none pb-[0.7rem] bg-[#FFFFFF17]",
    isFullWidth && "w-full",
    isError ? "textarea-error" : "textarea-primary",
    fieldProps?.className
  );

  const placeholder = fieldProps?.placeholder ?? labelToPlaceholder(label);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e);
    fieldProps?.onChange?.(e);
  }

  return (
    <textarea
      {...fieldProps}
      {...restChildrenProps}
      placeholder={placeholder}
      className={className}
      onChange={handleOnChange}
    />
  );
}
