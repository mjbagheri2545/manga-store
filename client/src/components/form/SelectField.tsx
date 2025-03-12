import React, { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/utils";

import { FormField, FormFieldChildrenProps, FormFieldProps } from "./formField";

function isOption(child: unknown): child is React.ReactElement {
  return React.isValidElement(child) && child.type === "option";
}

type SelectFieldProps = Omit<FormFieldProps, "children" | "controllerName"> &
  PropsWithChildren & {
    fieldProps?: ComponentProps<"select">;
    controllerName?: string;
  };

export function SelectField({
  fieldProps,
  children,
  ...restProps
}: SelectFieldProps) {
  return (
    <FormField {...restProps}>
      {(formFieldChildrenProps) => (
        <SelectFieldChildren
          {...formFieldChildrenProps}
          fieldProps={fieldProps}
        >
          {children}
        </SelectFieldChildren>
      )}
    </FormField>
  );
}

type SelectFieldChildrenProps = FormFieldChildrenProps &
  PropsWithChildren & {
    fieldProps?: ComponentProps<"select">;
  };

const SelectFieldChildren = React.forwardRef<
  HTMLSelectElement,
  SelectFieldChildrenProps
>(function SelectFieldChildren(
  { isFullWidth, isError, id, fieldProps, children, controllerProps },
  ref
) {
  const className = cn(
    "select rounded placeholder-white/40 focus:outline-none bg-dark-body",
    isFullWidth && "w-full",
    isError ? "select-error" : "select-primary",
    fieldProps?.className
  );

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    controllerProps?.onChange(e);
    fieldProps?.onChange?.(e);
  }

  return (
    <select
      {...fieldProps}
      {...controllerProps}
      ref={ref}
      className={className}
      id={id}
      onChange={handleOnChange}
    >
      {React.Children.map(children, (child) => {
        if (isOption(child)) {
          const newProps = { ...child.props, className: "bg-dark" };

          return React.cloneElement(child, newProps);
        }

        return child;
      })}
    </select>
  );
});
