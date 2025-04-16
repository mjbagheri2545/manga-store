import { Response } from "express";

import { errorLogger } from "@/constants/loggers";
import { Req } from "@/types";
import { successfulResponse } from "@/utils";

type LogClientErrorReq = Req<{
  message: string;
  componentStack: string | undefined;
}>;

function logClientError(req: LogClientErrorReq, res: Response) {
  const { message, componentStack } = req.body;

  errorLogger.logMessage(`Client Error: ${message}`, {
    metaData: { componentStack },
  });

  successfulResponse({ res });
}

export default logClientError;
