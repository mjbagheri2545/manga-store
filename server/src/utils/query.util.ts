import { Prisma } from "@prisma/client";

import { PaginateQuery, PaginateQueryWithSort } from "@/types";

export function paginate(query: PaginateQuery) {
  const { take, skip } = query;
  return {
    take: take != null ? parseInt(take) : undefined,
    skip: skip != null ? parseInt(skip) : undefined,
  };
}

export function parseQuerySort(
  sort?: string
): { createdAt: Prisma.SortOrder } | undefined {
  switch (sort) {
    case "newest":
      return { createdAt: "desc" };
    case "oldest":
      return { createdAt: "asc" };
    default:
      return { createdAt: "desc" };
  }
}

export function parsePaginateQueryWithSort(query: PaginateQueryWithSort) {
  return {
    ...paginate(query),
    orderBy: parseQuerySort(query.sort),
  };
}
