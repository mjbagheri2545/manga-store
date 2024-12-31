function createCrudMessages() {
  return {
    action: (email: string, fullName: string) =>
      `کاربر با ایمیل ${email} و نام و نام خانوادگی ${fullName}`,
    samePassword: "رمز عبور وارد شده مشابه با رمز عبور های قبلی است.",
  } as const;
}

export default createCrudMessages;
