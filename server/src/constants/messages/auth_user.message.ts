import CONFIG from "@/constants/config";

export function createAuthUserMessages() {
  return {
    auth: {
      registration: (email: string) =>
        `اکانت شما با ایمیل ${email} با موفقیت ساخته شد! خوش آمدید!`,
      login:
        "شما با موفقیت وارد سیستم شدید. خوشحالیم که دوباره شما را می‌بینیم!",
    },
    common: {
      emailAuthorization:
        "کاربری با این ایمیل یافت نشد. لطفاً ایمیل خود را بررسی کنید.",
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
    },
  } as const;
}

export function createAuthUserValidationMessages() {
  const { password } = CONFIG.validation;
  return {
    common: {
      password: {
        confirmation: (label: string) =>
          `رمز عبور ${label} با تأیید آن مطابقت ندارد. لطفاً دوباره بررسی کنید.`,
        new: (label: string) =>
          `طول ${label} باید حداقل ${password.minLength} کاراکتر باشد و متشکل از عدد و حروف باشد.`,
      },
      email: "لطفاً یک ایمیل معتبر وارد کنید.",
    },
  } as const;
}
