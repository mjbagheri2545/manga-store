import PATH from "@/constants/path";

const CONTENT = {
  registration: {
    submitButtonText: "ثبت نام",
    mainContent: {
      title: "ساخت حساب کاربری",
      links: [
        {
          to: PATH.auth.login,
          text: "قبلا ثبت نام کرده اید؟ از اینجا به حساب خود وارد شوید",
        },
      ],
    },
  },
  login: {
    submitButtonText: "ورود",
    mainContent: {
      title: "ورود به حساب کاربری",
      links: [
        {
          to: PATH.user.account.password.recovery.recover,
          text: "رمز عبور خود را فراموش کرده ام!",
        },
        {
          to: PATH.auth.registration,
          text: "حساب کاربری ندارید؟ از اینجا ثبت نام کنید",
        },
      ],
    },
  },
} as const;

export default CONTENT;
