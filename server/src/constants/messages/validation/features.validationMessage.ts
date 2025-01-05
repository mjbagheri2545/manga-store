import SHARED_CONFIG from "@/constants/config";

const featuresValidationMessages = {
  auth_user: {
    password: {
      confirmation: (label: string) =>
        `رمز عبور ${label} با تأیید آن مطابقت ندارد. لطفاً دوباره بررسی کنید.`,
      new: (label: string) =>
        `طول ${label} باید حداقل ${SHARED_CONFIG.validation.password.minLength} کاراکتر باشد و متشکل از عدد و حروف باشد.`,
    },
    email: "لطفاً یک ایمیل معتبر وارد کنید.",
    emailInUse:
      "این ایمیل قبلاً استفاده شده است. لطفاً با یک ایمیل دیگر دوباره تلاش کنید.",
  },
} as const;

export default featuresValidationMessages;
