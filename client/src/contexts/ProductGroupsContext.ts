import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ProductGroup } from "@/types";

export type TProductGroupsContext = {
  categories: ProductGroup[];
  productStatuses: ProductGroup[];
  tags: ProductGroup[];
};

export const ProductGroupsContext = createContext<TProductGroupsContext | null>(
  null
);

export function useProductGroups() {
  return useContextValue(ProductGroupsContext);
}
