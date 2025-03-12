import { EntityKey } from "@/types";

export const ENTITY_NAMES = {
  category: "دسته بندی",
  productStatus: "وضعیت محصول",
  tag: "ژانر",
  user: "کاربر",
  product: "محصول",
} as const satisfies Record<EntityKey, string>;

export const DEFAULT_QUERY_TAKE = 8;

export const STRING_MIN_LENGTH = 2;

export const DEFAULT_RETRY = 3;
export const DEFAULT_RETRY_DELAY = 1000;
