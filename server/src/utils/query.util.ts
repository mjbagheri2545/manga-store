import { Prisma } from "@prisma/client";

import { PaginateQuery, PaginateQueryWithSort } from "@/types";

export function paginate(query: PaginateQuery) {
  const { take, skip } = query;
  return {
    take: take != null ? parseInt(take) : undefined,
    skip: skip != null ? parseInt(skip) : undefined,
  };
}

type OrderByCreatedAt = {
  createdAt: Prisma.SortOrder;
};

function getCreatedAtSort(sort?: string) {
  switch (sort) {
    case "newest":
      return "desc";
    case "oldest":
      return "asc";
    default:
      return "desc";
  }
}

export function parseQueryWithSort(query: PaginateQueryWithSort) {
  return {
    ...paginate(query),
    orderBy: {
      createdAt: getCreatedAtSort(query.sort),
    } as OrderByCreatedAt,
  };
}
