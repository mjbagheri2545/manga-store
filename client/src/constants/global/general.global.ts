import { EntityKey } from "@/types";

export const ENTITY_NAMES = {
  category: "دسته بندی",
  productStatus: "وضعیت محصول",
  tag: "ژانر",
  user: "کاربر",
  product: "محصول",
  chapter: "فصل",
  productComment: "دیدگاه",
} as const satisfies Record<EntityKey, string>;

export const DEFAULT_QUERY_TAKE = 8;

export const DEFAULT_RETRY = 3;
export const DEFAULT_RETRY_DELAY = 1000;

export const DEFAULT_SORT_ITEMS = [
  {
    title: "جدید ترین",
    value: "newest",
  },
  {
    title: "قدیمی ترین",
    value: "oldest",
  },
];
