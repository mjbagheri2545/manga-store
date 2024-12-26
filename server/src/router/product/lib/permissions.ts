import { Product, User } from "@prisma/client";

import { hasPermission } from "@/utils";

import { ProductPermissions, ProductPermissionsAction } from "../types";

const PERMISSIONS = {
  admin: { view: true, create: true, update: true, delete: true },
  manager: {
    view: true,
    create: true,
    update: (user, product) => user.id === product.managerId,
    delete: (user, product) => user.id === product.managerId,
  },
  translator: {
    view: true,
    create: false,
    update: false,
    delete: false,
  },
  user: {
    view: true,
    create: false,
    update: false,
    delete: false,
  },
} as const satisfies ProductPermissions;

export function hasProductPermission(
  user: User,
  action: ProductPermissionsAction,
  data?: Product
) {
  return hasPermission(user, PERMISSIONS, action, data);
}
