function createGeneralMessages() {
  return {
    unexpectedError: "متأسفیم، خطایی غیرمنتظره رخ داده است.",
    jwtAuthorization:
      "شما از حساب کاربری خود خارج شده‌اید. لطفاً دوباره وارد شوید.",
    invalidFile: (fileTypes: string) =>
      `فایل نامعتیر است، فقط ${fileTypes} مجاز است.`,

    sendEmail: {
      failed:
        "عملیات ارسال ایمیل تایید با شکست مواجه شد. لطفاً دوباره تلاش کنید.",
      successful: (message?: string) =>
        `ایمیل تأیید با موفقیت به ${message ?? "آدرس ایمیل شما"} ارسال شد. لطفاً پوشه اسپم خود را نیز بررسی کنید.`,
      alreadySent: (remainingSeconds: number) =>
        `ایمیل تأیید قبلاً ارسال شده است. لطفاً ${remainingSeconds} ثانیه صبر کنید و سپس دوباره تلاش کنید.`,
    },
  } as const;
}

export default createGeneralMessages;
