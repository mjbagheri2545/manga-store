import loggerConfig from "./logger.config";
import timeConfig from "./time.config";
import validationConfig from "./validation.config";

const SHARED_CONFIG = {
  logger: loggerConfig,
  validation: validationConfig,
  time: timeConfig,
  defaultQueryTake: 20,
};

export default SHARED_CONFIG;
