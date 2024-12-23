import { errorLogger } from "@/constants/loggers";
import SHARED_DB from "@/db";
import { isError } from "@/utils";

async function deleteUnusedData() {
  try {
    await Promise.all([
      SHARED_DB.token.deleteExpiredTokens(),
      SHARED_DB.user.resetExpiredEmailRemainingTimes(),
    ]);
  } catch (error) {
    console.log(
      `An error occurred when deleting the unused documents: ${error}`
    );
    errorLogger.log("error", isError(error) ? error.message : error);
  }
}

export default deleteUnusedData;
