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

export function getAvatarChildren(fullName: string) {
  const names = fullName.split(" ");

  if (names.length === 1) {
    return names[0][0].toUpperCase();
  }

  const firstName = names[0];
  const lastName = names[names.length - 1];

  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
}
