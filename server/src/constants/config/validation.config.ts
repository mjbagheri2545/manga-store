function createValidationConfig() {
  const passwordMinLength = 8;
  return {
    password: {
      bcryptSaltLength: 10,
      minLength: passwordMinLength,
      pattern: `((?=.*\\d)(?=.*/[a-zA-Z]/).{${passwordMinLength},})`,
    },
    stringMinLength: 2,
    verificationCodeLength: 6,
  } as const;
}

export default createValidationConfig;
