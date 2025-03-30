import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { Chapter } from "@/types";

export type TChapterContext = {
  chapter: Chapter;
};

export const ChapterContext = createContext<TChapterContext | null>(null);

export function useChapter() {
  return useContextValue(ChapterContext);
}
