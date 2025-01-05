import winston, { transports } from "winston";

import SHARED_CONFIG from "@/constants/config";

import "winston-daily-rotate-file";

const {
  combine,
  timestamp,
  printf,
  errors,
  prettyPrint,
  json,
  colorize,
  splat,
  metadata,
} = winston.format;

const customFormat = printf((info) => {
  const { timestamp, level, message, stack, ...meta } = info;

  const baseInfo = `timestamp: "${timestamp}", level: "${level}", message: "${message}"`;

  const errorDetails = stack != null ? `, stack: "${stack}"` : "";
  const metaDetails =
    Object.keys(meta).length > 0 ? `, metadata: ${JSON.stringify(meta)}` : "";

  return `{ ${baseInfo}${errorDetails}${metaDetails} }\n\n`;
});

type GetFileRotateTransportOptions = {
  path: string;
  level?: string;
  format: winston.Logform.Format;
};

const getFileRotateTransport = ({
  path,
  level = "info",
  format,
}: GetFileRotateTransportOptions) =>
  new transports.DailyRotateFile({
    filename: `logs/${path}/%DATE%.log`,
    datePattern: SHARED_CONFIG.logger.datePattern,
    maxFiles: SHARED_CONFIG.logger.maxFiles,
    maxSize: SHARED_CONFIG.logger.maxSize,
    level,
    format,
  });

type CreateLoggerOptions = {
  fileName: string;
  level?: string;
};

const combinedFormat = combine(
  errors({ stack: true }),
  timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
  prettyPrint({ colorize: true }),
  colorize(),
  splat(),
  metadata({ fillExcept: ["timestamp", "level", "message", "stack"] }),
  customFormat
);

export function createLogger({ level, fileName }: CreateLoggerOptions) {
  const jsonTransport = getFileRotateTransport({
    level,
    path: `${fileName}/json`,
    format: json(),
  });
  const customFormatTransport = getFileRotateTransport({
    level,
    path: `${fileName}/custom`,
    format: customFormat,
  });

  return winston.createLogger({
    level,
    format: combinedFormat,
    transports: [jsonTransport, customFormatTransport],
  });
}
