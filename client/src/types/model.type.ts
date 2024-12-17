export const USER_ROLES = ["basic", "verified", "writer", "manager", "admin"];

export type User = {
  id: string;
  email: string;
  fullName: string;
  roles: (typeof USER_ROLES)[number][];
};
