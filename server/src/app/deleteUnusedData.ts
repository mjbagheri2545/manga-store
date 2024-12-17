import { errorLogger } from "@/constants/loggers";
import { isError } from "@/utils";

async function deleteUnusedData() {
  try {
    await Promise.all([]);
  } catch (error) {
    console.log(
      `An error occurred when deleting the unused documents: ${error}`
    );
    errorLogger.log("error", isError(error) ? error.message : error);
  }
}

export default deleteUnusedData;
