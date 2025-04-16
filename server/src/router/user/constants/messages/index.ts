import { $Enums } from "@prisma/client";

import { UserBase, VERIFICATION_CODE_LENGTH } from "../global";
import userAccountMessages from "./account.message";

const USER_MESSAGES = {
  account: userAccountMessages,
  editProfile: "پروفایل شما با موفقیت به‌روزرسانی شد.",
  crud: {
    action: (user: UserBase) =>
      `کاربر با ایمیل ${user.email} و نام و نام خانوادگی ${user.fullName}`,
    samePassword: "رمز عبور وارد شده مشابه با رمز عبور های قبلی است.",
  },
  validation: {
    verificationCode: `طول کد تأیید باید ${VERIFICATION_CODE_LENGTH} کاراکتر باشد.`,
    invalidRole: `سطح دسترسی نامعتبر است، سطح دسترسی باید یکی از مقادیر ${Object.values($Enums.Role).join(", ")} باشد.`,
  },
} as const;

export default USER_MESSAGES;
