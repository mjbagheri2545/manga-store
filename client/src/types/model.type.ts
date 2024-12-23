export const USER_ROLES = ["basic", "verified", "writer", "manager", "admin"];

export type User = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  avatarImage?: string;
  roles: (typeof USER_ROLES)[number][];
};
