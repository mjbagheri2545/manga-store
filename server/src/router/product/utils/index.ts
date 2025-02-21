import { Request } from "express";

import { Product } from "@prisma/client";

import { pick } from "@/utils";

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
