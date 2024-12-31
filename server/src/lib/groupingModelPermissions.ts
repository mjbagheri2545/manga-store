import { User } from "@prisma/client";

import { hasPermission } from "@/utils";

import { GroupingModels, Permissions, PermissionsAction } from "../types";

const PERMISSIONS = {
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
} as const satisfies Permissions<GroupingModels>;

export function hasGroupingModelPermission<T extends GroupingModels>(
  user: User,
  action: PermissionsAction,
  data?: T
) {
  return hasPermission(user, PERMISSIONS, action, data);
}
