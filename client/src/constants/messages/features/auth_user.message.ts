import { PASSWORD_MIN_LENGTH } from "@/constants/global/features/auth_user.global";

const AUTH_USER_MESSAGES = {
  password: {
    confirmation: (label: string) =>
      `رمز عبور ${label} با تأیید آن مطابقت ندارد. لطفاً دوباره بررسی کنید.`,
    new: (label: string) =>
      `طول ${label} باید حداقل ${PASSWORD_MIN_LENGTH} کاراکتر باشد و متشکل از عدد و حروف باشد.`,
  },
  email: "لطفاً یک ایمیل معتبر وارد کنید.",
} as const;

export default AUTH_USER_MESSAGES;
