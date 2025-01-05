const statusCodeMessages = {
  internalServerError:
    "به نظر می‌رسد که سرور با یک خطای غیرمنتظره مواجه شده است. لطفاً دوباره تلاش کنید.",
  forbidden: "متاسفیم، شما سطح دسترسی کافی را دارا نیستید.",
  badRequest: (message?: string) =>
    `به نظر می‌رسد اطلاعات وارد شده نامعتبر است.${
      message != null && message.length > 0 ? ` ${message} لطفاً` : " لطفاً"
    } دوباره تلاش کنید.`,
  unauthorized: "شما از حساب کاربری خود خارج شده‌اید. لطفاً دوباره وارد شوید.",
  notFound: (entityName: string, entityInfo = "آیدی") =>
    `متاسفیم، ${entityName} با این ${entityInfo} پیدا نشد.`,
} as const;

export default statusCodeMessages;
