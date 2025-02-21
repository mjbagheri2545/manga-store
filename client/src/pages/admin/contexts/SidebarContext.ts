import { createContext } from "react";

import { useContextValue } from "@/hooks";

type TSidebarContext = {
  isOpened: boolean;
  toggleIsOpened: () => void;
};

export const SidebarContext = createContext<TSidebarContext | null>(null);

export function useSidebar() {
  return useContextValue(SidebarContext);
}
