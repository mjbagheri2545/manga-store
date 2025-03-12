import { twMerge } from "tailwind-merge";

import { FormField_FieldProps } from ".";

type LabelProps = Pick<FormField_FieldProps, "labelProps" | "isRequired"> & {
  isError: boolean;
  id: string;
  label: string;
};

function Label({ label, labelProps, isRequired, isError, id }: LabelProps) {
  const errorClassName = isError ? "text-error" : "";

  return (
    <label
      {...labelProps}
      htmlFor={id}
      className={twMerge("label max-w-max", labelProps?.className)}
    >
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
  );
}

export default Label;
