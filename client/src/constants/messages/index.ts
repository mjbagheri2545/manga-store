import createValidationMessages from "./validation";

const SHARED_MESSAGES = {
  validation: createValidationMessages(),
  unexpectedError: "متأسفیم، خطایی غیرمنتظره رخ داده است.",
} as const;

export default SHARED_MESSAGES;
