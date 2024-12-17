import bcrypt from "bcrypt";

import CONFIG from "@/constants/config";

export function hashPassword(password: string) {
  const salt = CONFIG.validation.password.bcryptSaltLength;
  return bcrypt.hash(password, salt);
}
