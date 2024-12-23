import env from "@/constants/env";

export function storageSetItem<T>(
  key: string,
  value: T,
  storage: Storage = localStorage
) {
  const prefixedKey = getPrefixedKey(key);
  const jsonValue = JSON.stringify(value);
  storage.setItem(prefixedKey, jsonValue);
}

export function storageGetItem<T>(
  key: string,
  storage: Storage = localStorage
): T | null {
  const prefixedKey = getPrefixedKey(key);
  const jsonValue = storage.getItem(prefixedKey);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export function storageRemoveItem(
  key: string,
  storage: Storage = localStorage
) {
  const prefixedKey = getPrefixedKey(key);
  storage.removeItem(prefixedKey);
}

function getPrefixedKey(key: string) {
  const keyPrefix = env.VITE_APP_TITLE;
  return `${keyPrefix}-${key}`;
}
