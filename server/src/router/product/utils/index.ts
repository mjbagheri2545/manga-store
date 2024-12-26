import { Prisma } from "@prisma/client";

import { paginate } from "@/utils";

import { ProductQuery } from "../types";

export function parseQuery(query: ProductQuery): Prisma.ProductFindManyArgs {
  return {
    ...paginate(query),
    orderBy: {
      createdAt: query.sort ?? "desc",
    } as Prisma.ProductFindManyArgs["orderBy"],
  };
}
