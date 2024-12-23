import createValidationConfig from "./validation.config";

const SHARED_CONFIG = {
  validation: createValidationConfig(),
} as const;

export default SHARED_CONFIG;
