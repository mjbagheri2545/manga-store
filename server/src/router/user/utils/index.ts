import { Request, Response } from "express";

import { v4 as uuidV4 } from "uuid";

import { TIME } from "@/constants/global/general.global";
import { EmptyObject, IdentityVerificationReq } from "@/types";
import {
  badRequest,
  getExpirationTime,
  isExpired,
  pick,
  removeFile,
  updateFile,
  writeFile,
} from "@/utils";

import { VERIFICATION_CODE_LENGTH } from "../constants/global";
import USER_MESSAGES from "../constants/messages";
import tokenService from "../services/token.service";
import userService from "../services/user.service";

export async function generateVerificationToken(userId: string) {
  const uuid = uuidV4();
  const verificationCode = generateVerificationCodeFromUuid(uuid);

  const expirationTime = getIdentificationExpirationTime();

  await tokenService.create(userId, {
    verificationCode,
    expirationTime,
  });

  return verificationCode;
}

function generateVerificationCodeFromUuid(uuid: string): string {
  const uuidWithoutDash = uuid.replace(/-/g, "");
  const uuidLength = uuidWithoutDash.length;

  const code = Array(VERIFICATION_CODE_LENGTH)
    .fill(undefined)
    .reduce((previousCode) => {
      previousCode += uuidWithoutDash[Math.floor(uuidLength * Math.random())];
      return previousCode;
    }, "");

  return code;
}

function getIdentificationExpirationTime() {
  return getExpirationTime(TIME.identificationExpirationMinutes);
}

export function getEmailRemainingSeconds(date: Date) {
  const timeDifference = date.getTime() - Date.now();
  return timeDifference > 0 ? Math.ceil(timeDifference / 1000) : 0;
}

export async function identityVerification<Body = EmptyObject>(
  req: IdentityVerificationReq<Body>,
  res: Response
) {
  const { failed } = USER_MESSAGES.account.identityVerification;

  const { user } = req.body;
  const { verificationCode } = req.params;

  const token = await tokenService.getByUserIdAndValue(
    user.id,
    verificationCode
  );

  if (token == null || isExpired(token?.expirationTime)) {
    return badRequest(res, {
      message: failed,
      isFullMessage: true,
    });
  }
}

export function pickUserCreateData(req: Request) {
  return pick(req.body, [
    "fullName",
    "email",
    "password",
    "avatarImage",
    "role",
    "bio",
    "walletBalanceInToman",
  ]);
}

type UpdateAvatarImageOptions = {
  file: Express.Multer.File;
  newAvatarImagePath: string;
  oldAvatarImagePath: string | null;
  userId: string;
};

export async function updateAvatarImage({
  file,
  newAvatarImagePath,
  oldAvatarImagePath,
  userId,
}: UpdateAvatarImageOptions) {
  if (oldAvatarImagePath != null) {
    const updateProductImageError = await updateFile({
      file,
      newFilePath: newAvatarImagePath,
      oldFilePath: oldAvatarImagePath,
      isPublic: false,
    });

    if (updateProductImageError != null) {
      return updateProductImageError;
    }
  } else {
    const writeFileError = await writeFile(newAvatarImagePath, file.buffer);

    if (writeFileError != null) {
      // remove chunks of file that has been written to server
      // and then delete already created product
      await removeFile(newAvatarImagePath);
      await userService.delete(userId);

      return writeFileError;
    }
  }
}
