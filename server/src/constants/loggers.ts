import { createLogger } from "@/utils";

export const errorLogger = createLogger({
  level: "error",
  fileName: "error",
});

export const unhandledRejectionLogger = createLogger({
  level: "error",
  fileName: "rejection",
});

export const httpLogger = createLogger({
  fileName: "request",
});

export const emailLogger = createLogger({
  fileName: "email",
});
