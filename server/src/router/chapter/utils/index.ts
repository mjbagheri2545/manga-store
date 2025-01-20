import { Chapter } from "@prisma/client";

import { pick } from "@/utils";

export function chapterLoggerData(chapter: Chapter) {
  return pick(chapter, ["id", "productId", "episode"]);
}
