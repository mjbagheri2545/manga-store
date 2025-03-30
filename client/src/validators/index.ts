import { z } from "zod";

import SHARED_MESSAGES from "@/constants/messages";

type MessageOptions = { label: string } | { message: string };
type MinOptions = MessageOptions & { min?: number };
type MinMaxOptions = MinOptions & { max: number };
type LengthOptions = MessageOptions & {
  length: number;
};

export const STRING_MIN_LENGTH = 2;
export const NUMBER_MIN_VALUE = 1;

export function string(label?: string) {
  return z
    .string({
      invalid_type_error: SHARED_MESSAGES.validation.invalidType(label),
    })
    .trim();
}

export function required(options: MessageOptions) {
  const isLabelProvided = "label" in options;
  const message = isLabelProvided
    ? SHARED_MESSAGES.validation.required(options.label)
    : options.message;

  return string(isLabelProvided ? options.label : undefined).min(1, {
    message,
  });
}

export const minLength = createMinValidator({
  typeLabel: "طول",
  defaultMin: STRING_MIN_LENGTH,
  validator: string,
});

export const minMaxLength = createMinMaxValidator({
  typeLabel: "طول",
  defaultMin: STRING_MIN_LENGTH,
  validator: string,
});

export function length({ length, ...restOptions }: LengthOptions) {
  const isLabelProvided = "label" in restOptions;
  const message = isLabelProvided
    ? SHARED_MESSAGES.validation.length(restOptions.label, length)
    : restOptions.message;

  return string(isLabelProvided ? restOptions.label : undefined).length(
    length,
    {
      message,
    }
  );
}

export function slugValidator() {
  return required({ label: "آدرس اینترنتی" });
}

export function number(label?: string) {
  return z.coerce
    .number({
      invalid_type_error: SHARED_MESSAGES.validation.invalidType(label),
    })
    .int(`${label ?? "این فیلد"} باید عدد صحیح باشد`);
}

export const minNumber = createMinValidator({
  typeLabel: "مقدار",
  defaultMin: NUMBER_MIN_VALUE,
  validator: number,
});

export const minMaxNumber = createMinMaxValidator({
  typeLabel: "مقدار",
  defaultMin: NUMBER_MIN_VALUE,
  validator: number,
});

export function fileValidator(label?: string) {
  return z.instanceof(File, {
    message: SHARED_MESSAGES.validation.invalidType(label),
  });
}

type CreateMinValidatorOptions<S extends z.ZodString | z.ZodNumber> = {
  typeLabel: string;
  defaultMin: number;
  validator: (label?: string) => S;
};

function createMinValidator<S extends z.ZodString | z.ZodNumber>({
  typeLabel,
  defaultMin,
  validator,
}: CreateMinValidatorOptions<S>) {
  return function ({ min = defaultMin, ...restOptions }: MinOptions) {
    const isLabelProvided = "label" in restOptions;
    const message = isLabelProvided
      ? SHARED_MESSAGES.validation.min({
          label: restOptions.label,
          min,
          typeLabel,
        })
      : restOptions.message;

    return validator(isLabelProvided ? restOptions.label : undefined).min(min, {
      message,
    }) as S;
  };
}

function createMinMaxValidator<S extends z.ZodString | z.ZodNumber>({
  typeLabel,
  defaultMin,
  validator,
}: CreateMinValidatorOptions<S>) {
  return function ({ min = defaultMin, max, ...restOptions }: MinMaxOptions) {
    const isLabelProvided = "label" in restOptions;
    const message = isLabelProvided
      ? SHARED_MESSAGES.validation.minMax({
          label: restOptions.label,
          min,
          max,
          typeLabel,
        })
      : restOptions.message;

    return validator(isLabelProvided ? restOptions.label : undefined)
      .min(min, message)
      .max(max, message) as S;
  };
}
