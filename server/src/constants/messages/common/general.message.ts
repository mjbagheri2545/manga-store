function createGeneralMessages() {
  return {
    jwtAuthorization:
      "شما از حساب کاربری خود خارج شده‌اید. لطفاً دوباره وارد شوید.",
    sendEmail: {
      failedMessage: "ارسال ایمیل تایید",
      successful: (message?: string) =>
        `ایمیل تأیید با موفقیت به ${message ?? "آدرس ایمیل شما"} ارسال شد. لطفاً پوشه اسپم خود را نیز بررسی کنید.`,
      alreadySent: (remainingSeconds: number) =>
        `ایمیل تأیید قبلاً ارسال شده است. لطفاً ${remainingSeconds} ثانیه صبر کنید و سپس دوباره تلاش کنید.`,
    },
  } as const;
}

export default createGeneralMessages;
