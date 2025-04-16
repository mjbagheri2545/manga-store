import { Prisma, User } from "@prisma/client";

import { createLogger } from "@/utils";

export const userLogger = createLogger({
  fileName: "features/user",
});

export const VERIFICATION_CODE_LENGTH = 6;

export type UserBase = Pick<
  User,
  | "id"
  | "email"
  | "fullName"
  | "createdAt"
  | "avatarImage"
  | "roles"
  | "isVerified"
  | "bio"
  | "walletBalanceInToman"
>;
export const USER_BASE_SELECT: Prisma.UserSelect = {
  id: true,
  email: true,
  fullName: true,
  createdAt: true,
  avatarImage: true,
  roles: true,
  isVerified: true,
  bio: true,
  walletBalanceInToman: true,
};

export const PERMISSION_USER_SELECT: Prisma.UserSelect = {
  id: true,
  avatarImage: true,
};
