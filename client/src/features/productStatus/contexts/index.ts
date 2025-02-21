import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { ProductGroup } from "@/types";

export type TProductStatusesContext = ProductGroup[];

export const ProductStatusesContext =
  createContext<TProductStatusesContext | null>(null);

export function useProductStatuses() {
  return useContextValue(ProductStatusesContext);
}
