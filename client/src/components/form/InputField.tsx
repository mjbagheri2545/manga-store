import React, { ComponentProps } from "react";

import { cn, labelToPlaceholder } from "@/utils";

import { FormField, FormFieldChildrenProps, FormFieldProps } from "./formField";

export type InputFieldProps = Omit<
  FormFieldProps,
  "children" | "controllerName"
> & {
  fieldProps?: ComponentProps<"input">;
  controllerName?: string;
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

const InputFieldChildren = React.forwardRef<
  HTMLInputElement,
  InputFieldChildrenProps
>(function InputFieldChildren(
  { isFullWidth, isError, id, label, fieldProps, controllerProps },
  ref
) {
  const className = cn(
    "input rounded placeholder-white/40 border-none pb-[0.7rem] bg-[#FFFFFF17]",
    isFullWidth && "w-full",
    isError ? "input-error" : "input-primary",
    fieldProps?.className
  );

  const placeholder = fieldProps?.placeholder ?? labelToPlaceholder(label);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    controllerProps?.onChange(e);
    fieldProps?.onChange?.(e);
  }

  return (
    <input
      type="text"
      {...fieldProps}
      {...controllerProps}
      ref={ref}
      id={id}
      placeholder={placeholder}
      className={className}
      onChange={handleOnChange}
    />
  );
});
