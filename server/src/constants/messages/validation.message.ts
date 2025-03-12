import { upperFirst } from "@/utils";

const validationMessages = {
  required: (label: string) => `${label} الزامی است.`,
  minLength: (label: string, minLength: number) =>
    `${label} باید حداقل ${minLength} کاراکتر باشد.`,
  unknownFields: (message: string) =>
    `${upperFirst(message)} نامعتبر هستند و شناخته نشدند. لطفاً دوباره با اطلاعات معتبر تلاش کنید.`,
  slug: (label: string) => `متاسفیم، ${label} یافت نشد.`,

  tooManyInvalidField: (fields: string[]) =>
    `${fields.length === 1 ? "مقدار" : "مقادیر"} ${fields.join("، ")} نامعتبر ${fields.length === 1 ? "است" : "هستند"}.`,
  invalidInt: (label: string) => `${label} باید عدد صحیح باشد.`,
} as const;

export default validationMessages;
