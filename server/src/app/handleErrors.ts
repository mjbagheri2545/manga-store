import { errorLogger, unhandledRejectionLogger } from "@/constants/loggers";
import { getError, getErrorMessageForLogger } from "@/utils";

function handleErrors() {
  process.on("uncaughtException", (error, origin) => {
    errorLogger.error(getErrorMessageForLogger(error), { origin });
    process.exit(1);
  });

  process.on("unhandledRejection", (error, promise) => {
    unhandledRejectionLogger.error(getErrorMessageForLogger(getError(error)), {
      promise,
    });
    unhandledRejectionLogger.on("finish", () => process.exit(1));
  });
}

export default handleErrors;
