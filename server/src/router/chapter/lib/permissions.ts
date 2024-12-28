import { User } from "@prisma/client";

import { hasPermission } from "@/utils";

import {
  ChapterPermissions,
  ChapterPermissionsAction,
  PermissionChapter,
} from "../types";

const PERMISSIONS = {
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
} as const satisfies ChapterPermissions;

export function hasChapterPermission(
  user: User,
  action: ChapterPermissionsAction,
  data?: PermissionChapter
) {
  return hasPermission(user, PERMISSIONS, action, data);
}
