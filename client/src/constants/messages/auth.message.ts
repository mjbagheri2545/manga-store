import CONFIG from "../config";

export function createAuthMessages() {
  return {
    alreadyLoggedIn: "شما قبلاً با این ایمیل وارد شده اید.",
  } as const;
}

export function createAuthValidationMessages() {
  const { password, verificationCodeLength } = CONFIG.validation;
  return {
    email: "ایمیل نامعتبر است",
    password: {
      new: `طول رمز عبور شما باید حداقل ${password.minLength} باشد و متشکل از عدد و حروف باشد`,
      confirmation: "رمز عبور با تاییدیه رمز عبور مطابقت ندارد",
    },
    verificationCode: `کد تایید باید ${verificationCodeLength} رقمی باشد`,
  } as const;
}
