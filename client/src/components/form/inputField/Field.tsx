import { ComponentProps, forwardRef, useEffect, useId, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";

function labelToPlaceholder(label: string) {
  return `${label} را وارد کنید`;
}

export type InputField_FieldProps = {
  inputProps?: ComponentProps<"input">;
  labelProps?: ComponentProps<"label">;
  containerProps?: ComponentProps<"div">;
  label: string;
  isRequired?: boolean;
  controllerName: string;
  isMarginBottom?: boolean;
  controllerOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  externalOnChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isFocus?: boolean;
};

const InputField_Field = forwardRef<HTMLDivElement, InputField_FieldProps>(
  function InputField_Field(
    {
      controllerName,
      inputProps,
      labelProps,
      containerProps,
      isRequired = true,
      isMarginBottom = true,
      ...restProps
    },
    ref
  ) {
    const {
      id,
      label,
      placeholder,
      inputRef,
      isError,
      errorMessage,
      handleOnChange,
    } = useInputField_Field({ controllerName, ...restProps });

    const containerMarginClassName = isMarginBottom && !isError ? "mb-4" : "";
    const errorClassName = isError ? "text-error" : "";

    return (
      <div
        {...containerProps}
        className={twMerge(
          `form-control ${containerMarginClassName}`,
          containerProps?.className
        )}
        ref={ref}
      >
        <label {...labelProps} htmlFor={id} className="label max-w-max">
          {isRequired ? (
            <span className={`label-text text-base ${errorClassName}`}>
              {label}
              <span className="text-error mr-1 inline-block text-lg translate-y-0.5">
                *
              </span>
            </span>
          ) : (
            <span className={`label-text ${errorClassName}`}>{label}</span>
          )}
        </label>
        <input
          type="text"
          {...inputProps}
          placeholder={placeholder}
          onChange={handleOnChange}
          required={false}
          id={id}
          className={twMerge(
            `input input-bordered ${isError ? "input-error" : "input-primary"} rounded-sm bg-[#FFFFFF17] placeholder-white/40 pb-[0.7rem] border-none`,
            inputProps?.className
          )}
          ref={inputRef}
        />
        {isError ? (
          <p className="text-error text-sm mx-1.5 mt-1 mb-3">
            {errorMessage as string}
          </p>
        ) : null}
      </div>
    );
  }
);

export default InputField_Field;

function useInputField_Field({
  controllerName,
  inputProps,
  isFocus = false,
  externalOnChange,
  controllerOnChange,
  label,
}: InputField_FieldProps) {
  const id = useId();

  const placeholder = inputProps?.placeholder ?? labelToPlaceholder(label);

  const { formState } = useFormContext();
  const error = formState.errors[controllerName];
  const isError = error?.type != null;
  const errorMessage = error?.message;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocus) {
      inputRef?.current?.focus();
    }
  }, [isFocus]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    controllerOnChange(e);
    externalOnChange?.(e);
  }

  return {
    id,
    label,
    placeholder,
    inputRef,
    isError,
    errorMessage,
    handleOnChange,
  };
}
