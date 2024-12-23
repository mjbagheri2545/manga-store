function createValidationConfig() {
  const passwordMinLength = 8;
  return {
    password: {
      bcryptSaltRounds: 10,
      minLength: passwordMinLength,
      pattern: new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).{${passwordMinLength},}$`),
    },
    stringMinLength: 2,
  } as const;
}

export default createValidationConfig;
