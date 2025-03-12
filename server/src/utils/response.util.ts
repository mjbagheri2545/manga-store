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

export function badRequest(res: Response, messageToSend?: MessageToSend) {
  const { badRequest: badRequestMessage } = SHARED_MESSAGES.statusCode;

  let message: string;

  if (typeof messageToSend === "string") {
    message = badRequestMessage(messageToSend);
  } else {
    message = messageToSend?.isFullMessage
      ? messageToSend.message
      : badRequestMessage(messageToSend?.message ?? "");
  }

  return failedResponse({
    res,
    code: STATUS_CODES.badRequest,
    message,
  });
}

export function unauthorized(
  res: Response,
  message: string = SHARED_MESSAGES.statusCode.unauthorized
) {
  return failedResponse({
    res,
    code: STATUS_CODES.unauthorized,
    message,
  });
}

export function forbidden(
  res: Response,
  message: string = SHARED_MESSAGES.statusCode.forbidden
) {
  return failedResponse({
    res,
    code: STATUS_CODES.forbidden,
    message,
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

type FailedOperationOptions = {
  res: Response;
  message: string;
};

export function failedOperation({ res, message }: FailedOperationOptions) {
  return failedResponse({
    res,
    code: STATUS_CODES.internalServerError,
    message: SHARED_MESSAGES.failed(message),
  });
}
