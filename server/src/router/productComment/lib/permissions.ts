import { User } from "@prisma/client";

import {
  PermissionProductComment,
  Permissions,
  PermissionsAction,
} from "@/types";
import { hasPermission } from "@/utils";

const PRODUCT_COMMENT_PERMISSIONS = {
  admin: {
    view: true,
    create: true,
    update: false,
    delete: true,
  },
  manager: {
    view: true,
    create: true,
    update: (user: User, productComment) => user.id === productComment.authorId,
    delete: (user: User, productComment) =>
      user.id === productComment.authorId ||
      user.id === productComment.product.managerId,
  },
  translator: {
    view: true,
    create: true,
    update: (user: User, productComment) => user.id === productComment.authorId,
    delete: (user: User, productComment) => user.id === productComment.authorId,
  },
  user: {
    view: true,
    create: true,
    update: (user: User, productComment) => user.id === productComment.authorId,
    delete: (user: User, productComment) => user.id === productComment.authorId,
  },
} as const satisfies Permissions<PermissionProductComment>;

export function hasProductCommentPermission(
  user: User,
  action: PermissionsAction,
  data?: PermissionProductComment
) {
  return hasPermission(user, PRODUCT_COMMENT_PERMISSIONS, action, data);
}
