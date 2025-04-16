import { User } from "@prisma/client";

import { Permissions, PermissionsAction, PermissionUser } from "@/types";
import { hasPermission } from "@/utils";

// view false is mean for all users list in admin page not
// mean single user accounts in the site
const USER_PERMISSIONS = {
  admin: { view: true, create: true, update: true, delete: true },
  manager: {
    view: false,
    create: false,
    update: (user, userToUpdate) => user.id === userToUpdate.id,
    delete: (user, userToDelete) => user.id === userToDelete.id,
  },
  translator: {
    view: false,
    create: false,
    update: (user, userToUpdate) => user.id === userToUpdate.id,
    delete: (user, userToDelete) => user.id === userToDelete.id,
  },
  user: {
    view: false,
    create: false,
    update: (user, userToUpdate) => user.id === userToUpdate.id,
    delete: (user, userToDelete) => user.id === userToDelete.id,
  },
} as const satisfies Permissions<PermissionUser>;

export function hasUserPermission(
  user: User,
  action: PermissionsAction,
  data?: PermissionUser
) {
  return hasPermission(user, USER_PERMISSIONS, action, data);
}
