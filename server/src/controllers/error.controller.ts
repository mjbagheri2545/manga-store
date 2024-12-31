import { Request, Response } from "express";

import { errorLogger } from "@/constants/loggers";

import ControllerConfiguration from "./configuration.controller";

class ErrorController extends ControllerConfiguration {
  error(error: Error, _: Request, res: Response) {
    const { internalServerError: message } = this.SHARED_MESSAGES.statusCode;

    errorLogger.error(error.stack);
    this.failedResponse({
      res,
      code: this.STATUS_CODES.internalServerError,
      message,
    });
  }
}

export default ErrorController;
