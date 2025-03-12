import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { State } from "@/types";

export type TEntitiesContext<T> = State<T[]>;

export const EntitiesContext = createContext<TEntitiesContext<any> | null>(
  null
);

export function useEntities<T>() {
  return useContextValue(EntitiesContext) as TEntitiesContext<T>;
}
