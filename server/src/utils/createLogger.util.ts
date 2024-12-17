import winston from "winston";
const { combine, timestamp, printf, errors, prettyPrint } = winston.format;

const myFormat = printf((info) => {
  const { timestamp, level, message } = info;
  if (info instanceof Error) {
    const { name, stack } = info;
    return `{timestamp: ${timestamp}, level: ${level}, messege: ${message}, name: ${name}, stack: ${stack}}\n`;
  }
  return `{timestamp: ${timestamp}, level: ${level}, messege: ${message}}\n`;
});

type CreateLogger = {
  level: string;
  transports: winston.transport[];
};

export function createLogger({ level, transports = [] }: CreateLogger) {
  return winston.createLogger({
    level,
    format: combine(
      errors({ stack: true }),
      timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
      prettyPrint({ colorize: true }),
      myFormat
    ),
    transports,
  });
}
