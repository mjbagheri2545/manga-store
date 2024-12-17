import createLoggerConfig from "./logger.config";
import createTimeConfig from "./time.config";
import createValidationConfig from "./validation.config";

const CONFIG = {
  logger: createLoggerConfig(),
  validation: createValidationConfig(),
  time: createTimeConfig(),
};

export default CONFIG;
