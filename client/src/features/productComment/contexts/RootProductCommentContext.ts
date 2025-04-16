import { createContext } from "react";

import { GetAllRootProductCommentBase } from "@/contexts/ProductContext";
import { useContextValue } from "@/hooks";

export const RootProductCommentContext =
  createContext<GetAllRootProductCommentBase | null>(null);

export function useRootProductComment() {
  return useContextValue(RootProductCommentContext);
}
