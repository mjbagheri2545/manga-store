import { User, UserRole } from "./model.type";

export type PermissionsAction = "view" | "create" | "update" | "delete";

export type PermissionChecker<T> = boolean | ((user: User, data: T) => boolean);

export type Permissions<T, A extends PermissionsAction = PermissionsAction> = {
  [R in UserRole]: Partial<{
    [Action in A]: PermissionChecker<T>;
  }>;
};
