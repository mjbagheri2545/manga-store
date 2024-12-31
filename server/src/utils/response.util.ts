import { Response } from "express";

import SHARED_MESSAGES from "@/constants/messages";
import STATUS_CODES, { StatusCode } from "@/constants/statusCodes";
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

export const badRequest = createSpecificFailedResponse(
  STATUS_CODES.badRequest,
  SHARED_MESSAGES.statusCode.badRequest
);

export const unauthorized = createSpecificFailedResponse(
  STATUS_CODES.unauthorized,
  SHARED_MESSAGES.statusCode.unauthorized
);

export function forbidden(res: Response) {
  const { forbidden: forbiddenMessage } = SHARED_MESSAGES.statusCode;

  return failedResponse({
    res,
    code: STATUS_CODES.forbidden,
    message: forbiddenMessage,
  });
}

type NotFoundOptions = {
  res: Response;
  entityName: string;
  entityInfo?: string;
};

export function notFound({
  res,
  entityName,
  entityInfo = "آیدی",
}: NotFoundOptions) {
  const { notFound: notFoundMessage } = SHARED_MESSAGES.statusCode;

  return failedResponse({
    res,
    code: STATUS_CODES.notFound,
    message: notFoundMessage(entityName, entityInfo),
  });
}

export function successfulResponse<T = unknown>({
  res,
  code = STATUS_CODES.ok,
  message = "Ok",
  data,
}: SuccessfulResponseOptions<T>) {
  res.status(code).json({ message, data });
}

export function failedResponse({
  res,
  code = STATUS_CODES.badRequest,
  message = "Error",
}: failedResponseOptions) {
  res.status(code).json({ message });
}

function createSpecificFailedResponse(
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

    failedResponse({
      res,
      code,
      message,
    });
  };
}
