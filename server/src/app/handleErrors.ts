import { errorLogger, unhandledRejectionLogger } from "@/constants/loggers";
import { isError } from "@/utils";

function handleErrors() {
  process.on("uncaughtException", (error, origin) => {
    errorLogger.log(
      "error",
      `${error.message} with stack ${error.stack} at origin ${origin}`
    );
    process.exit(1);
  });

  process.on("unhandledRejection", (error, promise) => {
    unhandledRejectionLogger.log(
      "error",
      `${isError(error) ? error.message : error} \n at promise: ${promise}`
    );
    unhandledRejectionLogger.on("finish", () => process.exit(1));
  });
}

export default handleErrors;
