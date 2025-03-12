const generalMessages = {
  unexpectedError: "متأسفیم! مشکلی پیش آمده، لطفاً دوباره تلاش کنید.",
  invalidFileType: (fileType: string) =>
    `فایل نامعتیر است، فقط تایپ ${fileType} مجاز است.`,
  tooLargeFile: (fileSizeLimitMessage: string) =>
    `سایز فایل نباید بیشتر از ${fileSizeLimitMessage} باشد.`,

  sendEmail: {
    failed:
      "عملیات ارسال ایمیل تایید با شکست مواجه شد. لطفاً دوباره تلاش کنید.",
    successful: (message?: string) =>
      `ایمیل تأیید با موفقیت به ${message ?? "آدرس ایمیل شما"} ارسال شد. لطفاً پوشه اسپم خود را نیز بررسی کنید.`,
    alreadySent: (remainingSeconds: number) =>
      `ایمیل تأیید قبلاً ارسال شده است. لطفاً ${remainingSeconds} ثانیه صبر کنید و سپس دوباره تلاش کنید.`,
  },
} as const;

export default generalMessages;
