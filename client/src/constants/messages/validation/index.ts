import generalValidationMessages from "./general";

const validationMessages = {
  general: generalValidationMessages,

  required: (label: string) => `${label} الزامی است`,
  minLength: (label: string, minLength: number) =>
    `طول ${label} باید حداقل ${minLength} باشد`,
  invalidType: (label: string = "این فیلد") => `تایپ ${label} نامعتبر است`,
} as const;

export default validationMessages;
