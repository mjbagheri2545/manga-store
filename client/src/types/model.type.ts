export const USER_ROLES = ["user", "translator", "manager", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  avatarImage?: string;
  roles: UserRole[];
  isVerified: boolean;
  bio?: string;
  walletBalance: number;
};

export type ProductGroup = {
  id: string;
  slug: string;
  name: string;
};

export type Product = {
  id: string;
  persianName: string;
  name: string;
  slug: string;
  designer: string;
  writer: string;
  releaseYear: number;
  summary: string;
  priceInRials: number;
  productImage: string;
  createdAt: string;
};
