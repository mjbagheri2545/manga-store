import { User } from "@prisma/client";

import { Permissions, PermissionsAction } from "@/types";
import { hasPermission } from "@/utils";

// view false is mean for all users list in admin page not
// mean single user accounts in the site
const USER_PERMISSIONS = {
  admin: { view: true, create: true, update: true, delete: true },
  manager: {
    view: false,
    create: false,
    update: (user, userToUpdate) => user.id === userToUpdate.id,
    delete: false,
  },
  translator: {
    view: false,
    create: false,
    update: (user, userToUpdate) => user.id === userToUpdate.id,
    delete: false,
  },
  user: {
    view: false,
    create: false,
    update: (user, userToUpdate) => user.id === userToUpdate.id,
    delete: false,
  },
} as const satisfies Permissions<User>;

export function hasUserPermission(
  user: User,
  action: PermissionsAction,
  data?: User
) {
  return hasPermission(user, USER_PERMISSIONS, action, data);
}
