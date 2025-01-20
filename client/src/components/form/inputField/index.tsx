import { Controller, useFormContext } from "react-hook-form";

import Field, { InputField_FieldProps } from "./Field";

type InputFieldProps = Omit<InputField_FieldProps, "controllerOnChange"> & {
  defaultValue?: string;
};

export function InputField({
  controllerName,
  defaultValue = "",
  ...restProps
}: InputFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={controllerName}
      defaultValue={defaultValue}
      render={({ field: { onChange, ...rest } }) => {
        return (
          <Field
            controllerName={controllerName}
            controllerOnChange={onChange}
            {...restProps}
            {...rest}
          />
        );
      }}
    />
  );
}
