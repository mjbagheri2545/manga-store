import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ProductGroup } from "@/types";

export type TCategoriesContext = ProductGroup[];

export const CategoriesContext = createContext<TCategoriesContext | null>(null);

export function useCategories() {
  return useContextValue(CategoriesContext);
}
