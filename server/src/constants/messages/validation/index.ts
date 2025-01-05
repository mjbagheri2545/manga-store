import { upperFirst } from "@/utils";

import featuresValidationMessages from "./features.validationMessage";

const validationMessages = {
  features: featuresValidationMessages,

  required: (label: string) => `${label} الزامی است.`,
  minLength: (label: string, minLength: number) =>
    `${label} باید حداقل ${minLength} کاراکتر باشد.`,
  unknownFields: (message: string) =>
    `${upperFirst(message)} نامعتبر هستند و شناخته نشدند. لطفاً دوباره با اطلاعات معتبر تلاش کنید.`,
  slug: (label: string) => `متاسفیم، ${label} یافت نشد.`,
} as const;

export default validationMessages;
