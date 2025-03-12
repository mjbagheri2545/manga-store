import React from "react";

import { InputField } from "@/components/form";

export function isInputField(
  element: React.ReactNode
): element is React.JSX.Element {
  return React.isValidElement(element) && element.type === InputField;
}

export function labelToPlaceholder(label?: string) {
  return label != null ? `${label} را وارد کنید` : "";
}
