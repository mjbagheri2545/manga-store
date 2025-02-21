import { EntityKey } from "@/types";

export const ENTITY_NAMES = {
  category: "دسته بندی",
  chapter: "فصل",
  product: "محصول",
  productStatus: "وضعیت محصول",
  tag: "ژانر",
  user: "کاربر",
} as const satisfies Record<EntityKey, string>;

export const TIME = {
  minutesUntilResendingEmail: 1,
  identificationExpirationMinutes: 3,
} as const;

export const STRING_MIN_LENGTH = 2;

export const LOGGER_CONFIG = {
  maxSize: "20m",
  maxFiles: "14d",
  datePattern: "YYYY-MM-DD",
  timestampFormat: "YYYY-MM-DD hh:mm:ss A",
  fileName: (path: string) => `logs/${path}/%DATE%.log`,
} as const;
