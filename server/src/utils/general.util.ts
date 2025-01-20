import autoBind from "auto-bind";
import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { User } from "@prisma/client";

import SHARED_CONFIG from "@/constants/config";
import {
  EntityModels,
  PaginateQuery,
  Permissions,
  PermissionsAction,
  TypeOrTypeArray,
} from "@/types";

import { withCatch } from "./error.util";

export function upperFirst(str: string) {
  return str.slice(1) + str[0].toUpperCase();
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
  return getExpirationTime(SHARED_CONFIG.time.minutesUntilResendingEmail);
}

export function isExpired(time: Date | number) {
  return (typeof time === "number" ? time : time.getTime()) <= Date.now();
}

export function paginate(
  query: PaginateQuery,
  defaultTake: number = SHARED_CONFIG.defaultQueryTake
) {
  const { take, skip } = query;
  return {
    take: take != null ? parseInt(take) : defaultTake,
    skip: skip != null ? parseInt(skip) : 0,
  };
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

export function createUploader(uploadPath: string) {
  const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const finalUploadPath = path.join(__dirname, uploadPath);

      const [error] = await withCatch(fs.access(finalUploadPath));
      if (error) {
        await fs.mkdir(finalUploadPath, { recursive: true });
      }

      cb(null, finalUploadPath);
    },
    filename: (_, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  });

  const uploader = multer({
    storage,
  });

  return uploader;
}

export function newModelConnectionWithId(id: string | undefined, key: string) {
  if (id == null) return {};
  return { [key]: { connect: { id } } };
}

export async function removeFile(path: string) {
  await fs.access(path);
  await fs.unlink(path);
}

export function prismaSelectId() {
  return { id: true };
}

export abstract class AutoBind {
  constructor() {
    autoBind(this);
  }
}

export function updatedEntityFields<E extends EntityModels>(
  oldObj: E,
  updatedObj: E
) {
  const changedFieldsKeys = Object.keys(updatedObj).filter((key) => {
    const finalKey = key as keyof E;

    return updatedObj[finalKey] !== oldObj[finalKey];
  }) as (keyof E)[];

  return pick(updatedObj, changedFieldsKeys);
}

export function sleep(waitTime: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}
