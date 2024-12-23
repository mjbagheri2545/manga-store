import PATH from "@/constants/path";

import CONFIG from "./config";

const CONTENT = {
  account: {
    identityVerificationNoticeText: `کد تایید ${CONFIG.verificationCodeLength} کاراکتری که به ایمیل شما ارسال شد را وارد کنید.`,
    verification: {
      getEmail: {
        submitButtonText: "ارسال ایمیل تایید",
      },
      verify: {
        submitButtonText: "تایید حساب",
      },
      mainContent: {
        title: "تایید حساب",
        links: [],
      },
    },
    password: {
      recovery: {
        getEmail: {
          noticeText:
            "آدرس ایمیل خود را وارد کنید. یک لینک برای بازگردانی رمز عبور برای شما ارسال خواهد شد.",
          submitButtonText: "ارسال ایمیل بازگردانی",
        },
        recover: {
          submitButtonText: "بازگردانی",
        },
        mainContent: {
          title: "بازگردانی رمز عبور",
          links: [
            {
              to: PATH.auth.registration,
              text: "حساب کاربری ندارید؟ از اینجا ثبت نام کنید",
            },
            {
              to: PATH.auth.login,
              text: "قبلا ثبت نام کرده اید؟ از اینجا به حساب خود وارد شوید",
            },
          ],
        },
      },
      reset: {
        submitButtonText: "تنظیم مجدد",
      },
    },
  },
} as const;

export default CONTENT;
