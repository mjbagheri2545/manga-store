import { Chapter, Prisma } from "@prisma/client";

import { createLogger } from "@/utils";

export const chapterLogger = createLogger({
  fileName: "features/chapter",
});

export type ChapterBase = Pick<
  Chapter,
  "id" | "episode" | "chapterFile" | "createdAt" | "productId" | "status"
>;

export const CHAPTER_BASE_SELECT: Prisma.ChapterSelect = {
  id: true,
  episode: true,
  chapterFile: true,
  createdAt: true,
  productId: true,
  status: true,
};

export const PERMISSION_CHAPTER_SELECT: Prisma.ChapterSelect = {
  id: true,
  translatorId: true,
  product: { select: { managerId: true } },
  chapterFile: true,
};
