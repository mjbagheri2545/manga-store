import { PASSWORD_CONFIG } from "@/constants/global/featuers/auth_user.global";

const AUTH_USER_MESSAGES = {
  validation: {
    password: {
      confirmation: (label: string) =>
        `رمز عبور ${label} با تأیید آن مطابقت ندارد. لطفاً دوباره بررسی کنید.`,
      new: (label: string) =>
        `طول ${label} باید حداقل ${PASSWORD_CONFIG.minLength} کاراکتر باشد و متشکل از عدد و حروف باشد.`,
    },
    email: {
      invalid: "لطفاً یک ایمیل معتبر وارد کنید.",
      inUse:
        "این ایمیل قبلاً استفاده شده است. لطفاً با یک ایمیل دیگر دوباره تلاش کنید.",
    },
  },
} as const;

export default AUTH_USER_MESSAGES;
