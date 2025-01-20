import winston, { transports } from "winston";

import SHARED_CONFIG from "@/constants/config";

import "winston-daily-rotate-file";

const { combine, timestamp, printf, errors, prettyPrint, splat, metadata } =
  winston.format;

const customFormat = printf((info) => {
  const { timestamp, level, message, ...meta } = info;

  const baseInfo = `TIMESTAMP: "${timestamp}", LEVEL: "${level}", MESSAGE: "${message}"`;
  const metaDetails =
    Object.keys(meta).length > 0
      ? `, META_DATA: ${JSON.stringify(meta["metadata"] ?? meta)}`
      : "";

  return `{ ${baseInfo}${metaDetails} }\n\n`;
});

type GetFileRotateTransportOptions = {
  fileName: string;
  level?: string;
  formats: winston.Logform.Format[];
};

const getFileRotateTransport = ({
  fileName,
  level = "info",
  formats = [],
}: GetFileRotateTransportOptions) => {
  const baseFormats = [
    errors({ stack: true }),
    timestamp({ format: SHARED_CONFIG.logger.timestampFormat }),
    splat(),
    prettyPrint({ depth: 5 }),
    metadata({ fillExcept: ["timestamp", "level", "message"] }),
  ];

  // i don't use customFormat here on purpose,
  // because in the future i want to add cloud watching
  // and need other formats and transports
  const format = combine(...baseFormats, ...formats);

  return new transports.DailyRotateFile({
    filename: SHARED_CONFIG.logger.fileName(fileName),
    datePattern: SHARED_CONFIG.logger.datePattern,
    maxFiles: SHARED_CONFIG.logger.maxFiles,
    maxSize: SHARED_CONFIG.logger.maxSize,
    level,
    format,
  });
};

type LoggerLevel = "error" | "warn" | "info" | "http" | (string & {});

type CreateLoggerOptions = {
  fileName: string;
  level?: LoggerLevel;
};

type Info = string | Error;

type LogMessageOptions = {
  level?: LoggerLevel;
  metaData?: Record<string, any>;
};

export class CustomLogger extends winston.Logger {
  constructor(options: winston.LoggerOptions) {
    super(options);
  }

  logMessage(info: Info, { level, metaData = {} }: LogMessageOptions = {}) {
    let finalMessage: string;
    const finalLevel = level ?? this.level;

    if (typeof info === "string") {
      finalMessage = info;
    } else {
      // info is a Error
      finalMessage = info.message;

      if (info.stack != null) {
        metaData.stack = info.stack;
      }
    }

    this.log(finalLevel, finalMessage, metaData);
    return this;
  }
}

export function createLogger({
  level = "info",
  fileName,
}: CreateLoggerOptions): CustomLogger {
  const transport = getFileRotateTransport({
    level,
    fileName,
    formats: [customFormat],
  });

  return new CustomLogger({
    level,
    transports: transport,
  });
}
