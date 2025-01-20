import { useEffect, useState } from "react";

import { storageGetItem, storageRemoveItem, storageSetItem } from "@/utils";

type DefaultValue<T> = T | (() => T | undefined) | undefined;

export function useLocalStorage<T>(
  key: string,
  defaultValue?: DefaultValue<T>
) {
  const [value, setValue] = useState<T | undefined>(() => {
    const value = storageGetItem<T>(key);
    if (value != null) return value;
    return typeof defaultValue === "function"
      ? (defaultValue as () => T | undefined)()
      : defaultValue;
  });

  useEffect(() => {
    if (value == null) return storageRemoveItem(key);
    storageSetItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
