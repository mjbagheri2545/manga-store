const validationConfig = {
  password: {
    bcryptSaltRounds: 10,
    minLength: 8,
    pattern: new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).{${8},}$`),
  },
  stringMinLength: 2,
} as const;

export default validationConfig;
