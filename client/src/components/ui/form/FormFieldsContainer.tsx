import React, { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { InputFieldProps } from "@/components/form/InputField";
import { isInputField } from "@/utils";

type FormFieldsContainerProps = ComponentProps<"div">;

export function FormFieldsContainer({
  className,
  children,
  ...restProps
}: FormFieldsContainerProps) {
  return (
    <div
      {...restProps}
      className={twMerge("flex flex-wrap gap-6 md:gap-4", className)}
    >
      {React.Children.map(children, (child) => {
        if (isInputField(child)) {
          const newProps: InputFieldProps = {
            ...child.props,
            isMarginBottom: false,
            containerProps: {
              className: twMerge(
                "w-full md:w-auto md:flex-1",
                child.props.containerProps?.className
              ),
            },
          };

          return React.cloneElement(child, newProps);
        }

        return child;
      })}
    </div>
  );
}
