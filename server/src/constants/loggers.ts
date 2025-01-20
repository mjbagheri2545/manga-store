import { createLogger } from "@/utils";

export const errorLogger = createLogger({
  level: "error",
  fileName: "error",
});

export const requestLogger = createLogger({
  level: "http",
  fileName: "request",
});

export const emailLogger = createLogger({
  fileName: "email",
});
