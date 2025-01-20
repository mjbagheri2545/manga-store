import { GroupingModels, GroupingModelsEntityKey } from "@/types";

import { ENTITY_NAMES } from "../entities";

const crud = {
  create: (message: string) => `${message} با موفقیت ساخته شد.`,
  delete: (message: string) => `${message} با موفقیت حذف شد.`,
  update: (message: string) => `${message} با موفقیت به روز رسانی شد.`,
} as const;

type GroupingModelsEntityName = (typeof ENTITY_NAMES)[GroupingModelsEntityKey];

const featuresMessages = {
  crud,
  groupingModel: {
    crud: (entity: GroupingModels, entityName: GroupingModelsEntityName) => {
      return `${entityName} با اسم ${entity.name}`;
    },
  },
} as const;

export default featuresMessages;
