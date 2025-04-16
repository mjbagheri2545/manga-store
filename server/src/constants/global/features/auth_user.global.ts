const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_CONFIG = {
  bcryptSaltRounds: 10,
  minLength: PASSWORD_MIN_LENGTH,
  regex: new RegExp(`^(?=.*[A-Za-z])(?=.*\\d).{${PASSWORD_MIN_LENGTH},}$`),
} as const;
