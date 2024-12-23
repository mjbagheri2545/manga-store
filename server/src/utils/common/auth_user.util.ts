import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import CONFIG from "@/constants/config";

import { pick } from "../general.util";

export async function hashPassword(password: string) {
  const saltRounds = CONFIG.validation.password.bcryptSaltRounds;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export function pickUserData(user: User) {
  return pick(user, [
    "id",
    "email",
    "fullName",
    "roles",
    "createdAt",
    "avatarImage",
  ]);
}
