import { Product, User } from "@prisma/client";

import { Permissions, PermissionsAction } from "@/types";
import { hasPermission } from "@/utils";

const PRODUCT_PERMISSIONS = {
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
} as const satisfies Permissions<Product>;

export function hasProductPermission(
  user: User,
  action: PermissionsAction,
  data?: Product
) {
  return hasPermission(user, PRODUCT_PERMISSIONS, action, data);
}
