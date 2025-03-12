import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { State } from "@/types";

type TProgressContext = {
  progress: number;
  setProgress: State<number>[1];
  isUploading: boolean;
};

export const ProgressContext = createContext<TProgressContext | null>(null);

export function useProgress() {
  return useContextValue(ProgressContext);
}
