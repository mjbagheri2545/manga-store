import { Context, createContext } from "react";

import { useContextValue } from "@/hooks";
import { State } from "@/types";

export type TEntitiesContext<T> = {
  entities: T[];
  setEntities: State<T[]>[1];
};

export function createEntitiesContext<T>() {
  return createContext<TEntitiesContext<T> | null>(null);
}

export function useEntities<T>(
  EntitiesContext: Context<TEntitiesContext<T> | null>
) {
  return useContextValue(EntitiesContext);
}
