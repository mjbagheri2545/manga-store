type ValidationTypeLabel = { typeLabel: string };

type MinMaxValidationMessageOptions = {
  label: string;
  min: number;
  max: number;
} & ValidationTypeLabel;

type MinValidationMessageOptions = {
  label: string;
  min: number;
} & ValidationTypeLabel;

const validationMessages = {
  required: (label: string) => `${label} الزامی است`,

  optional: (label: string, message: string) =>
    `${label} اختیاری است ولی در صورت وجود ${message}`,

  min: ({ label, min, typeLabel }: MinValidationMessageOptions) =>
    `${typeLabel} ${label} باید حداقل ${min} باشد`,
  maxLength: (label: string, maxLength: number) =>
    `طول ${label} باید حداکثر ${maxLength} باشد`,

  invalidType: (label: string = "این فیلد") => `تایپ ${label} نامعتبر است`,

  minMax: ({ label, min, max, typeLabel }: MinMaxValidationMessageOptions) =>
    `${typeLabel} ${label} باید بین ${min} تا ${max} باشد`,

  length: (label: string, length: number) => `طول ${label} باید ${length} باشد`,

  tooSmallFileSize: (label: string) => `سایز ${label} خیلی کوچک است`,
} as const;

export default validationMessages;
