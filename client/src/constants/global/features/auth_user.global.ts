export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_REGEX = new RegExp(
  `^(?=.*[A-Za-z])(?=.*\\d).{${PASSWORD_MIN_LENGTH},}$`
);
