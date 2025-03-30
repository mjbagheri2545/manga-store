import fs from "fs/promises";
import { v4 as uuidV4 } from "uuid";
import { Prisma } from "@prisma/client";

import { PUBLIC_FOLDER_NAME } from "@/constants/global/general.global";

import { withCatch } from "./error.util";

function getFileName(file: Express.Multer.File) {
  const uuid = uuidV4();
  return `${uuid}-${file.originalname}`;
}

function getTodayDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month}-${day}`;
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
  const toadyDate = getTodayDate();

  const finalPath = isPublic
    ? `${PUBLIC_FOLDER_NAME}/${uploadPath}/${toadyDate}`
    : `${uploadPath}/${toadyDate}`;

  const [error] = await withCatch(fs.access(finalPath));

  if (error != null) {
    await fs.mkdir(finalPath, { recursive: true });
  }

  return `${finalPath}/${getFileName(file)}`;
}

export function getFilePathForDb(path: string) {
  return path.split(`${PUBLIC_FOLDER_NAME}/`)[1] ?? path;
}

export function getFilePathFromDbFilePath(
  path: string,
  { isPublic = true }: { isPublic?: boolean } = {}
) {
  return isPublic ? `${PUBLIC_FOLDER_NAME}/${path}` : path;
}

type RetryOptions = {
  retry?: number;
};

export async function removeFile(
  path: string,
  { retry = 3 }: RetryOptions = {}
): Promise<Error | undefined> {
  const [accessFileError] = await withCatch(fs.access(path));
  if (accessFileError == null) return accessFileError;

  const [removeFileError] = await withCatch(fs.unlink(path));

  if (removeFileError != null) {
    return retry > 1 ? removeFile(path, { retry: retry - 1 }) : removeFileError;
  }
}

export async function writeFile(
  path: string,
  data: Parameters<typeof fs.writeFile>[1],
  { retry = 3 }: RetryOptions = {}
): Promise<Error | undefined> {
  const [accessFileError] = await withCatch(fs.access(path));
  if (accessFileError == null) return accessFileError;

  const [writeFileError] = await withCatch(fs.writeFile(path, data));

  if (writeFileError != null) {
    return retry > 1
      ? writeFile(path, data, { retry: retry - 1 })
      : writeFileError;
  }
}

type UpdateFileOptions = {
  newFilePath: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  oldFilePath: string;
  file: Express.Multer.File;
  isPublic?: boolean;
};

export async function updateFile({
  file,
  newFilePath,
  oldFilePath,
  isPublic = true,
}: UpdateFileOptions) {
  const finalNewFilePath = getFilePathFromDbFilePath(newFilePath as string, {
    isPublic,
  });
  const writeFileError = await writeFile(finalNewFilePath, file.buffer);

  if (writeFileError != null) {
    return writeFileError;
  }

  const removeFileError = await removeFile(
    getFilePathFromDbFilePath(oldFilePath, { isPublic })
  );

  if (removeFileError != null) {
    await removeFile(finalNewFilePath);
    return removeFileError;
  }
}
