import { $Enums, User } from "@prisma/client";

export type PermissionsAction = "view" | "create" | "update" | "delete";

export type PermissionChecker<T> = boolean | ((user: User, data: T) => boolean);

export type Permissions<T, A extends PermissionsAction = PermissionsAction> = {
  [R in $Enums.Role]: Partial<{
    [Action in A]: PermissionChecker<T>;
  }>;
};
