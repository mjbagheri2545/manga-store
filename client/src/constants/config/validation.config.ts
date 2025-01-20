const passwordMinLength = 8;

const sharedValidationConfig = {
  stringMinLength: 2,
  password: {
    minLength: passwordMinLength,
    pattern: new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).{${passwordMinLength},}$`),
  },
} as const;

export default sharedValidationConfig;
