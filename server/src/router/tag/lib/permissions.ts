import { Tag, User } from "@prisma/client";

import { hasPermission } from "@/utils";

import { TagPermissions, TagPermissionsAction } from "../types";

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
} as const satisfies TagPermissions;

export function hasTagPermission(
  user: User,
  action: TagPermissionsAction,
  data?: Tag
) {
  return hasPermission(user, PERMISSIONS, action, data);
}
