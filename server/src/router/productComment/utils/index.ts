import { Prisma } from "@prisma/client";

import { PaginateQueryWithSort } from "@/types";
import { paginate, parseQuerySort, pick } from "@/utils";

import { ProductCommentBase } from "../constants/global";

export function productCommentLoggerData(productComment: ProductCommentBase) {
  return pick(productComment, ["id", "message"]);
}

function parseProductCommentQuerySort(
  sort?: string
): Prisma.ProductCommentOrderByWithRelationInput | undefined {
  switch (sort) {
    case "most-likes-count":
      return { likes: { _count: "desc" } };
    case "most-dislikes-count":
      return { dislikes: { _count: "desc" } };
    default:
      return parseQuerySort(sort);
  }
}

export function parseProductCommentQuery(query: PaginateQueryWithSort) {
  return {
    ...paginate(query),
    orderBy: parseProductCommentQuerySort(query.sort),
  };
}
