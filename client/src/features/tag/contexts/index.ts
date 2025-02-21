import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ProductGroup } from "@/types";

export type TTagsContext = ProductGroup[];

export const TagsContext = createContext<TTagsContext | null>(null);

export function useTags() {
  return useContextValue(TagsContext);
}
