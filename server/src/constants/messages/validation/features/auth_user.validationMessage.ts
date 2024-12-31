import SHARED_CONFIG from "@/constants/config";

export function createAuthUserValidationMessages() {
  const { password } = SHARED_CONFIG.validation;
  return {
    password: {
      confirmation: (label: string) =>
        `رمز عبور ${label} با تأیید آن مطابقت ندارد. لطفاً دوباره بررسی کنید.`,
      new: (label: string) =>
        `طول ${label} باید حداقل ${password.minLength} کاراکتر باشد و متشکل از عدد و حروف باشد.`,
    },
    email: "لطفاً یک ایمیل معتبر وارد کنید.",
    emailInUse:
      "این ایمیل قبلاً استفاده شده است. لطفاً با یک ایمیل دیگر دوباره تلاش کنید.",
  } as const;
}
