import autoBind from "auto-bind";
import fs from "fs/promises";
import { v4 as uuidV4 } from "uuid";
import { User } from "@prisma/client";

import { PUBLIC_FOLDER_NAME, TIME } from "@/constants/global/general.global";
import {
  Model,
  Permissions,
  PermissionsAction,
  TypeOrTypeArray,
} from "@/types";

import { withCatch } from "./error.util";

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

function getFileName(file: Express.Multer.File) {
  const uuid = uuidV4();
  return `${uuid}-${file.originalname}`;
}

type GetFilePathOptions = {
  uploadPath: string;
  file: Express.Multer.File;
  isPublic?: boolean;
};

export async function getFilePath({
  uploadPath,
  file,
  isPublic = true,
}: GetFilePathOptions) {
  const finalPath = isPublic
    ? `${PUBLIC_FOLDER_NAME}/${uploadPath}`
    : uploadPath;

  const [error] = await withCatch(fs.access(finalPath));

  if (error != null) {
    await fs.mkdir(finalPath, { recursive: true });
  }

  return `${finalPath}${getFileName(file)}`;
}

export function getFilePathForDb(path: string) {
  return path.split(`${PUBLIC_FOLDER_NAME}/`)[1];
}

export function getFilePathFromDbFilePath(
  path: string,
  { isPublic = true }: { isPublic?: boolean } = {}
) {
  return isPublic ? `${PUBLIC_FOLDER_NAME}/${path}` : path;
}

export function newModelConnectionWithId(id: string | undefined, key: string) {
  if (id == null) return {};
  return { [key]: { connect: { id } } };
}

export async function removeFile(
  path: string,
  retry = 3
): Promise<Error | undefined> {
  const [error] = await withCatch(
    Promise.all([fs.access(path), fs.unlink(path)])
  );

  if (error != null) {
    return retry > 1 ? removeFile(path, retry - 1) : error;
  }
}

export async function writeFile(
  path: string,
  data: Parameters<typeof fs.writeFile>[1],
  retry = 3
): Promise<Error | undefined> {
  const [error] = await withCatch(fs.writeFile(path, data));

  if (error != null) {
    return retry > 1 ? writeFile(path, data, retry - 1) : error;
  }
}

export abstract class AutoBind {
  constructor() {
    autoBind(this);
  }
}

export function updatedEntityFields<E extends Model>(oldObj: E, updatedObj: E) {
  const changedFieldsKeys = Object.keys(updatedObj).filter((key) => {
    const finalKey = key as keyof E;

    return updatedObj[finalKey] !== oldObj[finalKey];
  }) as (keyof E)[];

  return pick(updatedObj, changedFieldsKeys);
}

export function wait(waitTime: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}
