import React from "react";

import { InputField, SelectField, TextareaField } from "@/components/form";

export function isFormField(
  element: React.ReactNode
): element is React.JSX.Element {
  return (
    React.isValidElement(element) &&
    (element.type === InputField ||
      element.type === SelectField ||
      element.type === TextareaField)
  );
}

export function labelToPlaceholder(label: string) {
  return `${label} را وارد کنید`;
}
