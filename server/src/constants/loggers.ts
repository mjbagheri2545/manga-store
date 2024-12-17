import { transports } from "winston";

import CONFIG from "@/constants/config";
import { createLogger } from "@/utils";

import "winston-daily-rotate-file";

const getFileRotateTransport = (fileName: string) => [
  new transports.DailyRotateFile({
    filename: `logs/${fileName}/%DATE%.log`,
    datePattern: CONFIG.logger.datePattern,
    maxFiles: CONFIG.logger.maxFiles,
    maxSize: CONFIG.logger.maxSize,
  }),
];

export const errorLogger = createLogger({
  transports: getFileRotateTransport("error"),
  level: "error",
});
export const unhandledRejectionLogger = createLogger({
  level: "error",
  transports: getFileRotateTransport("rejection"),
});
export const httpLogger = createLogger({
  level: "http",
  transports: getFileRotateTransport("http"),
});
export const registrationLogger = createLogger({
  level: "info",
  transports: getFileRotateTransport("register"),
});
