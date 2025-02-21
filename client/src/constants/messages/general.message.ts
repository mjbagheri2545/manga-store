const generalMessages = {
  unexpectedError: (message?: string) =>
    `متأسفیم! مشکلی پیش آمده، لطفاً دوباره تلاش کنید.${message != null && message.length > 0 ? ` پیام خطا: ${message}` : ""}`,
  noFieldUpdated: "برای به‌روزرسانی، حداقل یک فیلد را تغییر دهید.",
} as const;

export default generalMessages;
