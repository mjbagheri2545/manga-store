function createAuthUserMessages() {
  return {
    emailAuthorization:
      "کاربری با این ایمیل یافت نشد. لطفاً ایمیل خود را بررسی کنید.",
  } as const;
}

export default createAuthUserMessages;
