import autoBind from "auto-bind";
import { User } from "@prisma/client";

import { TIME } from "@/constants/global/general.global";
import { Permissions, PermissionsAction, TypeOrTypeArray } from "@/types";

export function upperFirst(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function parseTypeOrTypeArray<T>(data: TypeOrTypeArray<T>): T[] {
  return Array.isArray(data) ? data : [data];
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function startCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function getExpirationTime(expirationMinutes: number) {
  return new Date(Date.now() + expirationMinutes * 60 * 1000);
}

export function getEmailRemainingTime() {
  return getExpirationTime(TIME.minutesUntilResendingEmail);
}

export function isExpired(time: Date | number) {
  return (typeof time === "number" ? time : time.getTime()) <= Date.now();
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

export function newModelConnectionWithId(id: string | undefined, key: string) {
  if (id == null) return {};
  return { [key]: { connect: { id } } };
}

export abstract class AutoBind {
  constructor() {
    autoBind(this);
  }
}

export function wait(waitTime: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}
