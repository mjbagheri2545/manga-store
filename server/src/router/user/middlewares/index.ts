import { NextFunction, Response } from "express";

import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { EmptyObject, SendEmailReq, UserAuthorizedReq } from "@/types";
import { failedResponse, isExpired, sendEmail } from "@/utils";

import { generateVerificationToken, getEmailRemainingSeconds } from "../utils";

export async function sendIdentityVerificationEmail(
  req: SendEmailReq,
  res: Response
) {
  const { user } = req.body;
  const verificationCode = await generateVerificationToken(user.id);

  return sendEmail({
    subject: "Verify Identity",
    templateOptions: {
      featureName: "user",
      name: "identification",
    },
    templateVariables: {
      name: user.fullName,
      verificationCode,
      expirationMinutes: SHARED_CONFIG.time.identificationExpirationMinutes,
    },
  })(req, res);
}

export function emailTypeHandler(
  req: UserAuthorizedReq<EmptyObject>,
  res: Response,
  next: NextFunction
) {
  const {
    body: { user },
  } = req;

  if (user.emailRemainingTime != null && !isExpired(user.emailRemainingTime)) {
    const { alreadySent: alreadySentMessage } =
      SHARED_MESSAGES.general.sendEmail;

    const remainingTime = getEmailRemainingSeconds(user.emailRemainingTime);

    failedResponse({
      res,
      code: STATUS_CODES.tooEarly,
      message: alreadySentMessage(remainingTime),
    });
  }

  return next();
}
