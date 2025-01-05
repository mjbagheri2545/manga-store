import { GroupingModels, GroupingModelsEntityKey } from "@/types";

import { ENTITY_NAMES } from "../entities";

const crud = {
  create: (message: string) => `${message} با موفقیت ساخته شد.`,
  delete: (message: string) => `${message} با موفقیت حذف شد.`,
  update: (message: string) => `${message} با موفقیت به روز رسانی شد.`,
} as const;

const featuresMessages = {
  crud,
  groupingModel: {
    crud: (
      entity: GroupingModels,
      entityName: (typeof ENTITY_NAMES)[GroupingModelsEntityKey]
    ) => {
      return `${entityName} با اسم ${entity.name}`;
    },
  },
} as const;

export default featuresMessages;
