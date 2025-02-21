import { ENTITY_NAMES } from "@/constants/global/general.global";
import { ProductGroupModel, ProductGroupModelEntityKey } from "@/types";

type ProductGroupModelEntityName =
  (typeof ENTITY_NAMES)[ProductGroupModelEntityKey];

const PRODUCT_GROUP_MESSAGES = {
  crud: (
    entity: ProductGroupModel,
    entityName: ProductGroupModelEntityName
  ) => {
    return `${entityName} با اسم ${entity.name}`;
  },
  alreadyExists: (entityName: ProductGroupModelEntityName) =>
    `یک ${entityName} با این نام یا آدرس اینترنتی از قبل وجود دارد. لطفاً اطلاعات جدید وارد کنید و دوباره تلاش کنید.`,
} as const;

export default PRODUCT_GROUP_MESSAGES;
