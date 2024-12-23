const MESSAGES = {
  registration: (email: string) =>
    `اکانت شما با ایمیل ${email} با موفقیت ساخته شد! خوش آمدید!`,
  login: "شما با موفقیت وارد سیستم شدید. خوشحالیم که دوباره شما را می‌بینیم!",
} as const;

export default MESSAGES;
