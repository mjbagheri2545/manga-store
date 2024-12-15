import PATH from "../path";

function createAuthContent() {
  const { user, auth } = PATH;

  return {
    registration: {
      submitButtonText: "ثبت نام",
      mainContent: {
        title: "ساخت حساب کاربری",
        links: [
          {
            to: auth.login,
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
            to: user.account.password.recovery.getEmail,
            text: "رمز عبور خود را فراموش کرده ام!",
          },
          {
            to: auth.registration,
            text: "حساب کاربری ندارید؟ از اینجا ثبت نام کنید",
          },
        ],
      },
    },
    lostPassword: {
      submitButtonText: "ورود",
      mainContent: {
        title: "فراموشی رمز عبور",
        links: [
          {
            to: auth.registration,
            text: "حساب کاربری ندارید؟ از اینجا ثبت نام کنید",
          },
          {
            to: auth.login,
            text: "قبلا ثبت نام کرده اید؟ از اینجا به حساب خود وارد شوید",
          },
        ],
      },
      noticeText: `آدرس ایمیل خود را وارد کنید. یک لینک برای بازگردانی رمز عبور برای ایمیل شما ارسال خواهد شد.`,
    },
  } as const;
}

export default createAuthContent;
