import { z } from "zod";

import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";

type RequiredOptions = { label: string } | { message: string };
type MinLengthOptions = RequiredOptions & { minLength?: number };

export function string(label?: string) {
  return z
    .string({
      invalid_type_error: SHARED_MESSAGES.validation.invalidType(label),
    })
    .trim();
}

export function required(options: RequiredOptions) {
  const isLabelProvided = "label" in options;
  const message = isLabelProvided
    ? SHARED_MESSAGES.validation.required(options.label)
    : options.message;

  return string(isLabelProvided ? options.label : undefined).min(1, {
    message,
  });
}

export function minLength(options: MinLengthOptions) {
  const minLength =
    options.minLength ?? SHARED_CONFIG.validation.stringMinLength;
  const isLabelProvided = "label" in options;
  const message = isLabelProvided
    ? SHARED_MESSAGES.validation.minLength(options.label, minLength)
    : options.message;

  return string(isLabelProvided ? options.label : undefined).min(minLength, {
    message,
  });
}
