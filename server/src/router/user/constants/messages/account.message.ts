function createAccountMessages() {
  return {
    verification: {
      successful: "حساب کاربری شما با موفقیت تأیید شد.",
      alreadyVerified: "حساب شما قبلاً تأیید شده است.",
    },
    password: {
      successful: "رمز عبور شما با موفقیت تغییر کرد.",
      failedMessage: "تغییر رمز عبور شما انجام نشد",
    },
    getEmail: {
      failedMessage: "ارسال ایمیل تایید",
      successful: (message?: string) =>
        `ایمیل تأیید با موفقیت به ${message ?? "آدرس ایمیل شما"} ارسال شد. لطفاً پوشه اسپم خود را نیز بررسی کنید.`,
      alreadySent: (remainingSeconds: number) =>
        `ایمیل تأیید قبلاً ارسال شده است. لطفاً ${remainingSeconds} ثانیه صبر کنید و سپس دوباره تلاش کنید.`,
    },
    identityVerification: {
      failed:
        "تأیید هویت شما موفق نبود. لطفاً مطمئن شوید که کد تأیید صحیح و معتبر است یا درخواست جدیدی ارسال کنید.",
      successful: "هویت شما با موفقیت تأیید شد! اکنون می‌توانید ادامه دهید.",
    },
  } as const;
}

export default createAccountMessages;
