const validationMessages = {
  required: (label: string) => `${label} الزامی است.`,
  minLength: (label: string, minLength: number) =>
    `${label} باید حداقل ${minLength} کاراکتر باشد.`,
  maxLength: (label: string, maxLength: number) =>
    `${label} باید حداکثر ${maxLength} کاراکتر باشد.`,
  minMaxLength: (label: string, minLength: number, maxLength: number) =>
    `طول ${label} باید بین ${minLength} تا ${maxLength} باشد`,

  minNumber: (label: string, minNumber: number) =>
    `مقدار ${label} باید حداقل از ${minNumber} باشد`,

  unknownFields: (fields: string) =>
    `${fields} نامعتبر هستند و شناخته نشدند. لطفاً دوباره با اطلاعات معتبر تلاش کنید.`,
  unknownField: (field: string) =>
    `${field} نامعتبر است و شناخته نشد. لطفاً دوباره با اطلاعات معتبر تلاش کنید.`,
  slug: (label: string) => `متاسفیم، ${label} یافت نشد.`,

  tooManyInvalidField: (fields: string[]) =>
    `${fields.length === 1 ? "مقدار" : "مقادیر"} ${fields.join("، ")} نامعتبر ${fields.length === 1 ? "است" : "هستند"}.`,
  invalidInt: (label: string) => `${label} باید عدد صحیح باشد.`,
} as const;

export default validationMessages;
