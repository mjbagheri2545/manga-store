import { User } from "@prisma/client";

import { hasPermission } from "@/utils";

import { Permissions, PermissionsAction, ProductGroupModel } from "../types";

const GROUPING_MODELS_PERMISSIONS = {
  admin: { view: true, create: true, update: true, delete: true },
  manager: {
    view: true,
    create: false,
    update: false,
    delete: false,
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
} as const satisfies Permissions<ProductGroupModel>;

export function hasProductGroupModelPermission<T extends ProductGroupModel>(
  user: User,
  action: PermissionsAction,
  data?: T
) {
  return hasPermission(user, GROUPING_MODELS_PERMISSIONS, action, data);
}
