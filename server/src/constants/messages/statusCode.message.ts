function createStatusCodeMessages() {
  return {
    internalServerError:
      "به نظر می‌رسد که سرور با یک خطای غیرمنتظره مواجه شده است. لطفاً دوباره تلاش کنید.",
    conflict:
      "این ایمیل قبلاً استفاده شده است. لطفاً با یک ایمیل دیگر دوباره تلاش کنید.",
    badRequest: (message?: string) =>
      `به نظر می‌رسد اطلاعات وارد شده نامعتبر است.${
        message != null && message.length > 0 ? ` ${message} لطفاً` : " لطفاً"
      } دوباره تلاش کنید.`,
    unauthorized: (message?: string) =>
      `برای دسترسی احراز هویت لازم است.${
        message != null && message.length > 0 ? ` ${message}` : ""
      } لطفاً دوباره تلاش کنید.`,
  } as const;
}

export default createStatusCodeMessages;
