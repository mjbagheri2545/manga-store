function createLoggerConfig() {
  return {
    maxSize: "20m",
    maxFiles: "14d",
    datePattern: "YYYY-MM-DD",
  } as const;
}

export default createLoggerConfig;
