import { ENTITY_NAMES } from "@/constants/entities";
import slugify from "@/lib/slugify";
import { EntityKey } from "@/types";

import {
  createValidation,
  required,
  slugValidator,
} from "./configuration.validator";

export class GroupingModelsValidator {
  createValidation(entityKey: EntityKey) {
    const entityName = ENTITY_NAMES[entityKey];

    const entitySlug = required(entityKey, {
      label: `آدرس اینترنتی ${entityName}`,
    }).custom((value) => slugify(value));

    return createValidation([
      entitySlug,
      required("name", { label: `نام ${entityName}` }),
    ]);
  }

  updateValidation(entityKey: EntityKey) {
    const entityName = ENTITY_NAMES[entityKey];

    const entitySlug = required(entityKey, {
      label: `آدرس اینترنتی ${entityName}`,
    })
      .optional()
      .ifExists()
      .custom((value) => slugify(value));

    return createValidation([
      entitySlug,
      required("name", { label: `نام ${entityName}` }).optional(),
      slugValidator(),
    ]);
  }
}
