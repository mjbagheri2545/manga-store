import { ComponentProps, forwardRef, useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";
import { v4 as uuidV4 } from "uuid";

import { camelCaseToLabelCase } from "@/utils";

function labelToPlaceholder(label: string) {
  return `Enter Your ${label}`;
}

type InputFieldProps = ComponentProps<"div"> & {
  inputProps?: ComponentProps<"input">;
  labelProps?: ComponentProps<"label">;
  label?: string;
  isRequired?: boolean;
  controllerName: string;
  isFocus?: boolean;
};

const InputField = forwardRef<HTMLDivElement, InputFieldProps>(
  function InputField(
    {
      children,
      className,
      controllerName,
      inputProps,
      labelProps,
      isRequired = true,
      isFocus = false,
      ...restProps
    },
    ref
  ) {
    const id = uuidV4();

    const label = restProps.label ?? camelCaseToLabelCase(controllerName);
    const placeholder = inputProps?.placeholder ?? labelToPlaceholder(label);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isFocus) {
        inputRef?.current?.focus();
      }
    }, [isFocus]);

    return (
      <div
        {...restProps}
        className={twMerge("form-control", className)}
        ref={ref}
      >
        <label {...labelProps} htmlFor={id} className="label">
          {isRequired ? (
            <span className="label-text">
              {label}
              <span className="text-error ml-1">*</span>
            </span>
          ) : (
            <span className="label-text"></span>
          )}
        </label>
        <input
          type="text"
          {...inputProps}
          placeholder={placeholder}
          id={id}
          className={twMerge(
            "input input-bordered input-primary",
            inputProps?.className
          )}
          ref={inputRef}
        >
          {children}
        </input>
      </div>
    );
  }
);

export default InputField;
