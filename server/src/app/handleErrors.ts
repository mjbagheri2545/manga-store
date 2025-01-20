import { errorLogger } from "@/constants/loggers";
import { getError, sleep } from "@/utils";

function handleErrors() {
  process.on("uncaughtException", async (error, origin) => {
    errorLogger.logMessage(error, { metaData: { origin } });

    await sleep();

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
