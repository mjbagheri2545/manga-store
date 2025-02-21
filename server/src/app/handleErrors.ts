import { errorLogger } from "@/constants/loggers";
import { getError, wait } from "@/utils";

function handleErrors() {
  process.on("uncaughtException", async (error, origin) => {
    errorLogger.logMessage(error, { metaData: { origin } });

    await wait();

    console.log("app crashed");
    process.exit(1);
  });

  process.on("unhandledRejection", (error, promise) => {
    errorLogger.logMessage(getError(error), {
      metaData: {
        promise,
      },
    });
  });
}

export default handleErrors;
