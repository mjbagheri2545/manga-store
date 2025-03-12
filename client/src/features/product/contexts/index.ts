import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { Product } from "@/types";

export type TProductContext = {
  product: Product;
};

export const ProductContext = createContext<TProductContext | null>(null);

export function useProduct() {
  return useContextValue(ProductContext);
}
