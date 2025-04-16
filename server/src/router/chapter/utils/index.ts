import { Prisma } from "@prisma/client";

import { PaginateQueryWithSort } from "@/types";
import { paginate, parseQuerySort, pick } from "@/utils";

import { ChapterBase } from "../constants/global";

export function chapterLoggerData(chapter: ChapterBase) {
  return pick(chapter, ["id", "productId", "episode"]);
}

function parseChapterQuerySort(
  sort?: string
): Prisma.ChapterOrderByWithRelationInput | undefined {
  switch (sort) {
    case "newest-episode":
      return { episode: "desc" };

    case "oldest-episode":
      return { episode: "asc" };

    default:
      return parseQuerySort(sort);
  }
}

export function parseChapterQuery(
  query: PaginateQueryWithSort
): Prisma.ChapterFindManyArgs {
  return { ...paginate(query), orderBy: parseChapterQuerySort(query.sort) };
}
