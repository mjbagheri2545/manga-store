import autoBind from "auto-bind";
import { z } from "zod";

import CONFIG from "@/constants/config";
import MESSAGES from "@/constants/messages";

type RequiredOptions = { label: string } | { message: string };
type MinLengthOptions = RequiredOptions & { minLength?: number };

class ValidatorConfiguration {
  protected readonly messages;
  protected readonly config;

  constructor() {
    autoBind(this);
    this.messages = MESSAGES.validation;
    this.config = CONFIG.validation;
  }

  string(label?: string) {
    return z
      .string({
        invalid_type_error: this.messages.invalidType(label),
      })
      .trim();
  }

  required(options: RequiredOptions) {
    const isLabelProvided = "label" in options;
    const message = isLabelProvided
      ? this.messages.required(options.label)
      : options.message;

    return this.string(isLabelProvided ? options.label : undefined).min(1, {
      message,
    });
  }

  minLength(options: MinLengthOptions) {
    const minLength = options.minLength ?? this.config.stringMinLength;
    const isLabelProvided = "label" in options;
    const message = isLabelProvided
      ? this.messages.minLength(options.label, minLength)
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
