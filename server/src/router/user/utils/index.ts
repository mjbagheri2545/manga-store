import { Response } from "express";

import { v4 as uuidV4 } from "uuid";

import SHARED_CONFIG from "@/constants/config";
import { EmptyObject, IdentityVerificationReq } from "@/types";
import { badRequest, getExpirationTime, isExpired } from "@/utils";

import CONFIG from "../constants/config";
import MESSAGES from "../constants/messages";
import DB from "../db";

export async function generateVerificationToken(userId: string) {
  const uuid = uuidV4();
  const verificationCode = generateVerificationCodeFromUuid(uuid);

  const expirationTime = getIdentificationExpirationTime();

  await DB.token.create(userId, {
    verificationCode,
    expirationTime,
  });

  return verificationCode;
}

function generateVerificationCodeFromUuid(uuid: string): string {
  const uuidWithoutDash = uuid.replace(/-/g, "");
  const uuidLength = uuidWithoutDash.length;

  const code = Array(CONFIG.verificationCodeLength)
    .fill(undefined)
    .reduce((previousCode) => {
      previousCode += uuidWithoutDash[Math.floor(uuidLength * Math.random())];
      return previousCode;
    }, "");

  return code;
}

export function getIdentificationExpirationTime() {
  return getExpirationTime(SHARED_CONFIG.time.identificationExpirationMinutes);
}

export function getEmailRemainingSeconds(date: Date) {
  const timeDifference = date.getTime() - Date.now();
  return timeDifference > 0 ? Math.ceil(timeDifference / 1000) : 0;
}

export async function identityVerification<Body = EmptyObject>(
  req: IdentityVerificationReq<Body>,
  res: Response
) {
  const { failed } = MESSAGES.account.identityVerification;

  const { user } = req.body;
  const { verificationCode } = req.params;

  const token = await DB.token.getByUserIdAndValue(user.id, verificationCode);

  if (token == null || isExpired(token?.expirationTime)) {
    return badRequest(res, {
      message: failed,
      isFullMessage: true,
    });
  }
}
