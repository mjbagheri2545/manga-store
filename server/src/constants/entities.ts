import { EntityKey } from "@/types";

export const ENTITY_NAMES = {
  category: "دسته بندی",
  chapter: "فصل",
  product: "محصول",
  productStatus: "وضعیت محصول",
  tag: "ژانر",
  user: "کاربر",
} as const satisfies Record<EntityKey, string>;
