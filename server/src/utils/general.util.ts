import CONFIG from "@/constants/config";
import { errorLogger } from "@/constants/loggers";
import SHARED_MESSAGES from "@/constants/messages";
import { TypeOrTypeArray } from "@/types";

export function upperFirst(str: string) {
  return str.slice(1) + str[0].toUpperCase();
}

export function parseTypeOrTypeArray<T>(data: TypeOrTypeArray<T>): T[] {
  return Array.isArray(data) ? data : [data];
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function startCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function getExpirationTime(expirationMinutes: number) {
  return new Date(Date.now() + expirationMinutes * 60 * 1000);
}

export function getEmailRemainingTime() {
  return getExpirationTime(CONFIG.time.minutesUntilResendingEmail);
}

export function isExpired(time: Date | number) {
  return (typeof time === "number" ? time : time.getTime()) <= Date.now();
}

export function withCatch<T>(
  promise: Promise<T>
): Promise<[Error] | [undefined, T]> {
  return promise
    .then((value) => {
      return [undefined, value] as [undefined, T];
    })
    .catch((error: Error) => {
      errorLogger.log("error", error.message);
      const finalError = isError(error)
        ? error
        : new Error(SHARED_MESSAGES.unexpectedError);
      return [finalError];
    });
}
