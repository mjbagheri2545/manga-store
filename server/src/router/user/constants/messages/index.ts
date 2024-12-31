import CONFIG from "../config";
import createAccountMessages from "./account.message";
import createCrudMessages from "./crud.message";

const MESSAGES = {
  account: createAccountMessages(),
  editProfile: "پروفایل شما با موفقیت بروز رسانی شد.",
  crud: createCrudMessages(),
  validation: {
    verificationCode: `طول کد تأیید باید ${CONFIG.verificationCodeLength} کاراکتر باشد.`,
    role: "سطح دسترسی نامعتبر است، سطح دسترسی باید مقادیر ادمین، مدیر، مترجم و کاربر باشد.",
  },
} as const;

export default MESSAGES;
