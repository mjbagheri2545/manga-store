import { errorLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function getError(error: unknown) {
  return isError(error)
    ? error
    : new Error(SHARED_MESSAGES.general.unexpectedError);
}

export function withCatch<T>(
  promise: Promise<T>,
  loggerFunction: (error: Error) => void = (error) =>
    errorLogger.logMessage(error)
): Promise<[Error] | [undefined, T]> {
  return promise
    .then((value) => {
      return [undefined, value] as [undefined, T];
    })
    .catch((error) => {
      const finalError = getError(error);
      loggerFunction(finalError);

      return [finalError];
    });
}
