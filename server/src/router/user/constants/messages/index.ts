import { User } from "@prisma/client";

import USER_CONFIG from "../config";
import userAccountMessages from "./account.message";

const USER_MESSAGES = {
  account: userAccountMessages,
  editProfile: "پروفایل شما با موفقیت به‌روزرسانی شد.",
  crud: {
    action: (user: User) =>
      `کاربر با ایمیل ${user.email} و نام و نام خانوادگی ${user.fullName}`,
    samePassword: "رمز عبور وارد شده مشابه با رمز عبور های قبلی است.",
  },
  validation: {
    verificationCode: `طول کد تأیید باید ${USER_CONFIG.verificationCodeLength} کاراکتر باشد.`,
    role: "سطح دسترسی نامعتبر است، سطح دسترسی باید مقادیر ادمین، مدیر، مترجم و کاربر باشد.",
  },
} as const;

export default USER_MESSAGES;
