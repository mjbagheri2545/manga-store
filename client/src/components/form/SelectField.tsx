import React, { ComponentProps } from "react";

import { cn } from "@/utils";

import { FormField, FormFieldChildrenProps, FormFieldProps } from "./formField";

function isOption(child: unknown): child is React.ReactElement {
  return React.isValidElement(child) && child.type === "option";
}

type SelectFieldProps = Omit<FormFieldProps, "children"> & {
  fieldProps?: ComponentProps<"select">;
};

export function SelectField({ fieldProps, ...restProps }: SelectFieldProps) {
  return (
    <FormField {...restProps}>
      {(formFieldChildrenProps) => (
        <SelectFieldChildren
          {...formFieldChildrenProps}
          fieldProps={fieldProps}
        />
      )}
    </FormField>
  );
}

type SelectFieldChildrenProps = FormFieldChildrenProps & {
  fieldProps?: ComponentProps<"select">;
};

function SelectFieldChildren({
  isFullWidth,
  isError,
  id,
  label,
  onChange,
  fieldProps,
  ...restChildrenProps
}: SelectFieldChildrenProps) {
  const className = cn(
    "select rounded placeholder-white/40 focus:outline-none bg-dark-body",
    isFullWidth && "w-full",
    isError ? "select-error" : "select-primary",
    fieldProps?.className
  );

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e);
    fieldProps?.onChange?.(e);
  }

  return (
    <select
      {...fieldProps}
      {...restChildrenProps}
      className={className}
      onChange={handleOnChange}
    >
      {React.Children.map(fieldProps?.children, (child) => {
        if (isOption(child)) {
          const newProps = { ...child.props, className: "bg-dark" };

          return React.cloneElement(child, newProps);
        }

        return child;
      })}
    </select>
  );
}
