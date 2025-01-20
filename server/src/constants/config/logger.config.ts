const loggerConfig = {
  maxSize: "20m",
  maxFiles: "14d",
  datePattern: "YYYY-MM-DD",
  timestampFormat: "YYYY-MM-DD hh:mm:ss A",
  fileName: (path: string) => `logs/${path}/%DATE%.log`,
} as const;

export default loggerConfig;
