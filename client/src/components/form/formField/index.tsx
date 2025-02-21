import React from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import FormField_Field, {
  FormField_FieldChildrenProps,
  FormField_FieldProps,
} from "./field";

export type FormFieldChildrenProps = FormField_FieldChildrenProps &
  ControllerRenderProps<FieldValues, string>;

export type FormFieldProps = Omit<FormField_FieldProps, "children"> & {
  defaultValue?: string;
  children: (props: FormFieldChildrenProps) => React.ReactNode;
};

export function FormField({
  controllerName,
  defaultValue = "",
  children,
  ...restProps
}: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={controllerName}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <FormField_Field controllerName={controllerName} {...restProps}>
            {(props) => children({ ...props, ...field })}
          </FormField_Field>
        );
      }}
    />
  );
}
