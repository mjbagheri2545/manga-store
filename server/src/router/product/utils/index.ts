import { Request } from "express";

import { Prisma, Product } from "@prisma/client";

import { paginate, pick } from "@/utils";

import { ProductQuery } from "../types";

export function parseQuery(query: ProductQuery): Prisma.ProductFindManyArgs {
  return {
    ...paginate(query),
    orderBy: {
      createdAt: query.sort ?? "desc",
    } as Prisma.ProductFindManyArgs["orderBy"],
  };
}

export function pickProductCreateData(req: Request) {
  return pick(req.body, [
    "name",
    "persianName",
    "writer",
    "designer",
    "priceInRials",
    "releaseYear",
    "slug",
    "summary",
  ]);
}

export function getTagsData(tagsId: string[], productTags: { id: string }[]) {
  const tags = tagsId.sort().map((id) => ({ id }));
  const currentTags = productTags.sort();

  const isSameTags = JSON.stringify(tags) === JSON.stringify(currentTags);

  return isSameTags ? {} : { tags: { set: tags } };
}

export function productLoggerData(product: Product) {
  return pick(product, ["name", "id", "managerId"]);
}
