import { upperFirst } from "@/utils";

import { createAuthUserValidationMessages } from "./auth_user.message";

function createValidationMessages() {
  return {
    auth_user: createAuthUserValidationMessages(),
    required: (label: string) => `${label} الزامی است.`,
    minLength: (label: string, minLength: number) =>
      `${label} باید حداقل ${minLength} کاراکتر باشد.`,
    unknownFields: (message: string) =>
      `${upperFirst(message)} نامعتبر هستند و شناخته نشدند. لطفاً دوباره با اطلاعات معتبر تلاش کنید.`,
  } as const;
}

export default createValidationMessages;
