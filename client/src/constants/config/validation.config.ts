function createSharedValidationConfig() {
  const passwordMinLength = 8;

  return {
    stringMinLength: 2,
    password: {
      minLength: passwordMinLength,
      pattern: new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).{${passwordMinLength},}$`),
    },
  } as const;
}

export default createSharedValidationConfig;
