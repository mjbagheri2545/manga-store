import { errorLogger } from "@/constants/loggers";
import sharedTokenService from "@/services/token.service";
import sharedUserService from "@/services/user.service";
import { getError } from "@/utils";

async function deleteUnusedData() {
  try {
    await Promise.all([
      sharedTokenService.deleteExpiredTokens(),
      sharedUserService.resetExpiredEmailRemainingTimes(),
    ]);
  } catch (error) {
    errorLogger.logMessage(getError(error));
  }
}

export default deleteUnusedData;
