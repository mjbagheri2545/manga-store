import { Request } from "express";

import { Prisma, Product } from "@prisma/client";

import { parseQueryWithSort, pick } from "@/utils";

import { ProductQuery } from "../types";

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

export function parseProductQuery(query: ProductQuery) {
  let where: Prisma.ProductWhereInput | undefined = undefined;

  if (query.name != null) {
    where = { name: { contains: query.name } };
  }

  if (query.status != null) {
    where = { ...where, status: { slug: query.status } };
  }

  return {
    ...parseQueryWithSort(query),
    where,
  };
}
