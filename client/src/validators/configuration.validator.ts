import autoBind from "auto-bind";
import { z } from "zod";

import CONFIG from "@/constants/config";
import MESSAGES from "@/constants/messages";

type RequiredOptions = { label: string } | { message: string };
type MinLengthOptions = RequiredOptions & { minLength?: number };

class ValidatorConfiguration {
  protected readonly MESSAGES;
  protected readonly CONFIG;

  constructor() {
    autoBind(this);
    this.MESSAGES = MESSAGES.validation;
    this.CONFIG = CONFIG.validation;
  }

  string(label?: string) {
    return z
      .string({
        invalid_type_error: this.MESSAGES.invalidType(label),
      })
      .trim();
  }

  required(options: RequiredOptions) {
    const isLabelProvided = "label" in options;
    const message = isLabelProvided
      ? this.MESSAGES.required(options.label)
      : options.message;

    return this.string(isLabelProvided ? options.label : undefined).min(1, {
      message,
    });
  }

  minLength(options: MinLengthOptions) {
    const minLength = options.minLength ?? this.CONFIG.stringMinLength;
    const isLabelProvided = "label" in options;
    const message = isLabelProvided
      ? this.MESSAGES.minLength(options.label, minLength)
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
