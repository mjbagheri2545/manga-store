import { errorLogger } from "@/constants/loggers";
import { sharedTokenService, sharedUserService } from "@/services";
import { getError } from "@/utils";

async function deleteUnusedData() {
  try {
    await Promise.all([
      sharedTokenService.deleteExpiredTokens(),
      sharedUserService.resetExpiredEmailRemainingTimes(),
    ]);
  } catch (error) {
    errorLogger.error(getError(error));
  }
}

export default deleteUnusedData;
