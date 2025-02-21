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

export function parseQueryWithSort(query: PaginateQueryWithSort) {
  return {
    ...paginate(query),
    orderBy: {
      createdAt: query.sort ?? "desc",
    } as OrderByCreatedAt,
  };
}
