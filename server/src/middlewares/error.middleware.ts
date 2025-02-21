import { NextFunction, Request, Response } from "express";

import { errorLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES from "@/constants/statusCodes";
import { failedResponse } from "@/utils";

export function errorMiddleware(
  error: Error,
  _: Request,
  res: Response,
  _next: NextFunction
) {
  const { internalServerError: message } = SHARED_MESSAGES.statusCode;

  errorLogger.logMessage(error);
  failedResponse({
    res,
    code: STATUS_CODES.internalServerError,
    message,
  });
}
