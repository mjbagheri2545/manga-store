import { upperFirst } from "@/utils";

import createCommonValidationMessages from "./common";

function createValidationMessages() {
  return {
    common: createCommonValidationMessages(),

    required: (label: string) => `${label} الزامی است.`,
    minLength: (label: string, minLength: number) =>
      `${label} باید حداقل ${minLength} کاراکتر باشد.`,
    unknownFields: (message: string) =>
      `${upperFirst(message)} نامعتبر هستند و شناخته نشدند. لطفاً دوباره با اطلاعات معتبر تلاش کنید.`,
    slug: (label: string) => `متاسفیم، ${label} یافت نشد.`,
  } as const;
}

export default createValidationMessages;
