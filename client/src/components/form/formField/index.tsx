import React from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import {
  FormField_Field,
  FormField_FieldChildrenProps,
  FormField_FieldProps,
} from "./field";

export type FormFieldChildrenProps = FormField_FieldChildrenProps & {
  controllerProps?: ControllerRenderProps<FieldValues, string>;
};

type ChildrenProps =
  | {
      children: (props: FormFieldChildrenProps) => React.ReactNode;
      controllerName: string;
    }
  | {
      children: (props: FormFieldChildrenProps) => React.ReactNode;
    };

export type FormFieldProps = Omit<
  FormField_FieldProps,
  "children" | "controllerName"
> & {
  defaultValue?: string;
} & ChildrenProps;

export function FormField({ defaultValue = "", ...restProps }: FormFieldProps) {
  const formContext = useFormContext();

  return "controllerName" in restProps ? (
    <Controller
      control={formContext.control}
      name={restProps.controllerName}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <FormField_Field {...restProps}>
            {(props) =>
              restProps.children({ ...props, controllerProps: field })
            }
          </FormField_Field>
        );
      }}
    />
  ) : (
    <FormField_Field {...restProps}>
      {(props) => restProps.children({ ...props })}
    </FormField_Field>
  );
}
