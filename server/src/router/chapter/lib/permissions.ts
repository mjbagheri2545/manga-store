import { User } from "@prisma/client";

import { PermissionChapter, Permissions, PermissionsAction } from "@/types";
import { hasPermission } from "@/utils";

const CHAPTER_PERMISSIONS = {
  admin: { view: true, create: true, update: true, delete: true },
  manager: {
    view: true,
    create: true,
    update: (user, chapter) => user.id === chapter.product.managerId,
    delete: (user, chapter) => user.id === chapter.product.managerId,
  },
  translator: {
    view: true,
    create: true,
    update: (user, chapter) => user.id === chapter.translatorId,
    delete: false,
  },
  user: {
    view: true,
    create: false,
    update: false,
    delete: false,
  },
} as const satisfies Permissions<PermissionChapter>;

export function hasChapterPermission(
  user: User,
  action: PermissionsAction,
  data?: PermissionChapter
) {
  return hasPermission(user, CHAPTER_PERMISSIONS, action, data);
}
