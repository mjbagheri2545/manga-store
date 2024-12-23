import createLoggerConfig from "./logger.config";
import createTimeConfig from "./time.config";
import createValidationConfig from "./validation.config";

const SHARED_CONFIG = {
  logger: createLoggerConfig(),
  validation: createValidationConfig(),
  time: createTimeConfig(),
};

export default SHARED_CONFIG;
