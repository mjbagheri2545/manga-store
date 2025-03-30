import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import { PASSWORD_CONFIG } from "@/constants/global/featuers/auth_user.global";

import { pick } from "../general.util";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(PASSWORD_CONFIG.bcryptSaltRounds);
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
    "isVerified",
    "walletBalanceInToman",
    "bio",
  ]);
}

export function userLoggerData(user: User) {
  return pick(user, ["email", "fullName", "id"]);
}
