import SHARED_MESSAGES from "@/constants/messages";
import { Permissions, PermissionsAction, TypeOrTypeArray, User } from "@/types";

export function parseTypeOrTypeArray<T>(data: TypeOrTypeArray<T>): T[] {
  return Array.isArray(data) ? data : [data];
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function withCatch<T>(
  promise: Promise<T>
): Promise<[Error] | [undefined, T]> {
  return promise
    .then((value) => {
      return [undefined, value] as [undefined, T];
    })
    .catch((error) => {
      const finalError = isError(error)
        ? error
        : new Error(SHARED_MESSAGES.general.unexpectedError);
      return [finalError];
    });
}

export function hasPermission<T>(
  user: User,
  permissions: Permissions<T>,
  action: PermissionsAction,
  data?: T
) {
  return user.roles.some((role) => {
    const permission = permissions[role][action];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
  });
}
