import { Chapter } from "@prisma/client";

import { Permissions, PermissionsAction } from "@/types";

export type ChapterPermissionsAction = PermissionsAction;

export type PermissionChapter = Chapter & {
  product: { managerId: string | null };
};

export type ChapterPermissions = Permissions<
  PermissionChapter,
  ChapterPermissionsAction
>;
