import { Response } from "express";

import autoBind from "auto-bind";

import MESSAGES from "@/constants/messages";
import PATH from "@/constants/path";
import STATUS_CODES, { StatusCode } from "@/constants/statusCodes";
import DB from "@/db";
import { TypeOrTypeArray } from "@/types";

type ResponseOptions = {
  res: Response;
  code?: StatusCode;
};

type SuccessfulResponseOptions<T = unknown> = ResponseOptions & {
  message?: string;
  data?: T;
};

type failedResponseOptions = ResponseOptions & {
  message?: TypeOrTypeArray<string>;
};

type MessageToSend = string | { message: string; isFullMessage?: boolean };

abstract class HelperConfiguration {
  protected readonly MESSAGES;
  protected readonly DB;
  protected readonly STATUS_CODES;
  readonly PATH;

  protected readonly badRequest;
  protected readonly unauthorized;

  constructor() {
    autoBind(this);
    this.PATH = PATH;
    this.MESSAGES = MESSAGES;
    this.DB = DB;
    this.STATUS_CODES = STATUS_CODES;

    this.badRequest = this.createSpecificFailedResponse(
      400,
      MESSAGES.statusCode.badRequest
    );
    this.unauthorized = this.createSpecificFailedResponse(
      401,
      MESSAGES.statusCode.unauthorized
    );
  }

  protected successfulResponse<T = unknown>({
    res,
    code = STATUS_CODES.ok,
    message = "Ok",
    data,
  }: SuccessfulResponseOptions<T>) {
    res.status(code).json({ message, data });
  }

  protected failedResponse({
    res,
    code = STATUS_CODES.badRequest,
    message = "Error",
  }: failedResponseOptions) {
    res.status(code).json({ message });
  }

  private createSpecificFailedResponse(
    code: StatusCode,
    messageFunction: (message: string) => string
  ) {
    return (res: Response, messageToSend?: MessageToSend) => {
      let message: string;

      if (typeof messageToSend === "string") {
        message = messageFunction(messageToSend);
      } else {
        message = messageToSend?.isFullMessage
          ? messageToSend.message
          : messageFunction(messageToSend?.message ?? "");
      }

      this.failedResponse({
        res,
        code,
        message,
      });
    };
  }
}

export default HelperConfiguration;
