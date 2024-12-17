import CONFIG from "@/constants/config";

export function createAuthUserMessages() {
  return {
    auth: {
      alreadyLoggedIn: "شما قبلاً با این ایمیل وارد شده اید.",
      logout: "شما با موفقیت از سیستم خارج شدید. منتظر بازگشت شما هستیم!",
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
