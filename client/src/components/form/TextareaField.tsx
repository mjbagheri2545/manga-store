import React, { ComponentProps } from "react";

import { cn, labelToPlaceholder } from "@/utils";

import { FormField, FormFieldChildrenProps, FormFieldProps } from "./formField";

type TextareaFieldProps = Omit<
  FormFieldProps,
  "children" | "controllerName"
> & {
  fieldProps?: ComponentProps<"textarea">;
  controllerName?: string;
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

const TextareaFieldChildren = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldChildrenProps
>(function TextareaFieldChildren(
  { isFullWidth, isError, id, label, fieldProps, controllerProps },
  ref
) {
  const className = cn(
    "textarea rounded placeholder-white/40 border-none pb-[0.7rem] bg-[#FFFFFF17]",
    isFullWidth && "w-full",
    isError ? "textarea-error" : "textarea-primary",
    fieldProps?.className
  );

  const placeholder = fieldProps?.placeholder ?? labelToPlaceholder(label);

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    controllerProps?.onChange(e);
    fieldProps?.onChange?.(e);
  }

  return (
    <textarea
      rows={3}
      {...fieldProps}
      {...controllerProps}
      ref={ref}
      placeholder={placeholder}
      className={className}
      id={id}
      onChange={handleOnChange}
    />
  );
});
