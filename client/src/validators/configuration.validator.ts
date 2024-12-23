import autoBind from "auto-bind";
import { z } from "zod";

import SHARED_CONFIG from "@/constants/config";
import SHARED_MESSAGES from "@/constants/messages";

type RequiredOptions = { label: string } | { message: string };
type MinLengthOptions = RequiredOptions & { minLength?: number };

class ValidatorConfiguration {
  protected readonly SHARED_MESSAGES;
  protected readonly SHARED_CONFIG;

  constructor() {
    autoBind(this);
    this.SHARED_MESSAGES = SHARED_MESSAGES.validation;
    this.SHARED_CONFIG = SHARED_CONFIG.validation;
  }

  string(label?: string) {
    return z
      .string({
        invalid_type_error: this.SHARED_MESSAGES.invalidType(label),
      })
      .trim();
  }

  required(options: RequiredOptions) {
    const isLabelProvided = "label" in options;
    const message = isLabelProvided
      ? this.SHARED_MESSAGES.required(options.label)
      : options.message;

    return this.string(isLabelProvided ? options.label : undefined).min(1, {
      message,
    });
  }

  minLength(options: MinLengthOptions) {
    const minLength = options.minLength ?? this.SHARED_CONFIG.stringMinLength;
    const isLabelProvided = "label" in options;
    const message = isLabelProvided
      ? this.SHARED_MESSAGES.minLength(options.label, minLength)
      : options.message;

    return this.string(isLabelProvided ? options.label : undefined).min(
      minLength,
      {
        message,
      }
    );
  }
}

export default ValidatorConfiguration;
