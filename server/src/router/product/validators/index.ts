import ValidatorConfiguration from "@/validators/configuration.validator";

import MESSAGES from "../constants/messages";

abstract class Validator extends ValidatorConfiguration {
  protected slug(field: string, label: string) {
    return this.required(field, {
      location: "params",
      message: MESSAGES.validation.slug(label),
    });
  }
}

export default Validator;
