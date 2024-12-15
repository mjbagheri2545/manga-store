function createValidationConfig() {
  const passwordMinLength = 8;

  return {
    stringMinLength: 2,
    verificationCodeLength: 4,
    password: {
      minLength: passwordMinLength,
      pattern: new RegExp(
        `((?=.*\\d)(?=.*/[a-zA-Z]/).{${passwordMinLength},})`
      ),
    },
  } as const;
}

export default createValidationConfig;
