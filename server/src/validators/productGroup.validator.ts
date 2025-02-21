import { ENTITY_NAMES } from "@/constants/global/general.global";
import slugify from "@/lib/slugify";
import { EntityKey } from "@/types";
import { AutoBind } from "@/utils/general.util";

import { createValidation, required, slugValidator } from ".";

export class ProductGroupModelValidator extends AutoBind {
  private entityName;
  constructor(entityKey: EntityKey) {
    super();
    this.entityName = ENTITY_NAMES[entityKey];
  }

  private entitySlug() {
    return required("slug", {
      label: `آدرس اینترنتی ${this.entityName}`,
    });
  }

  createEntityValidation() {
    const entitySlug = this.entitySlug().customSanitizer((value) =>
      slugify(value)
    );

    return createValidation([
      entitySlug,
      required("name", { label: `نام ${this.entityName}` }),
    ]);
  }

  updateEntityValidation() {
    const entitySlug = this.entitySlug()
      .optional()
      .ifExists()
      .customSanitizer((value) => slugify(value));

    return createValidation([
      entitySlug,
      required("name", { label: `نام ${this.entityName}` }).optional(),
      slugValidator(),
    ]);
  }
}
