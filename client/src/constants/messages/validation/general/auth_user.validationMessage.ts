import SHARED_CONFIG from "@/constants/config";

const authUserValidationMessages = {
  password: {
    confirmation: (label: string) =>
      `رمز عبور ${label} با تأیید آن مطابقت ندارد. لطفاً دوباره بررسی کنید.`,
    new: (label: string) =>
      `طول ${label} باید حداقل ${SHARED_CONFIG.validation.password.minLength} کاراکتر باشد و متشکل از عدد و حروف باشد.`,
  },
  email: "لطفاً یک ایمیل معتبر وارد کنید.",
} as const;

export default authUserValidationMessages;
