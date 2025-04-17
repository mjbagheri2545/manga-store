import { Request } from "express";

import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { paginate, parseQuerySort, pick } from "@/utils";

import { ProductBase } from "../constants/global";
import { ProductQuery } from "../types";

export function pickProductCreateData(req: Request) {
  return pick(req.body, [
    "name",
    "persianName",
    "writer",
    "designer",
    "oneChapterPriceInToman",
    "releaseYear",
    "slug",
    "summary",
  ]);
}

export function productLoggerData(product: ProductBase) {
  return pick(product, ["name", "id", "managerId"]);
}

function parseProductQuerySort(
  sort?: string
): Prisma.ProductFindManyArgs["orderBy"] {
  switch (sort) {
    case "most-views":
      return { views: { _count: "desc" } };
    case "high-chapters-count":
      return { chapters: { _count: "desc" } };
    case "most-comments-count":
      return { comments: { _count: "desc" } };
    default:
      return parseQuerySort(sort);
  }
}

export function parseProductQuery(query: ProductQuery) {
  let where: Prisma.ProductWhereInput | undefined = undefined;

  if (query.name != null) {
    where = { name: { contains: query.name } };
  }

  if (query.status != null && query.status !== "all") {
    where = { ...where, status: { slug: query.status } };
  }

  return {
    ...paginate(query),
    orderBy: parseProductQuerySort(query.sort),
    where,
  };
}

type ProductWithCount = { _count: { views: number; chapters: number } };

export type MappedProduct<T> = Omit<T, "_count"> & {
  views: number;
  chaptersCount: number;
};

export async function setCountKeyWithTotalCount<T extends ProductWithCount>(
  promise: Promise<[T[], number]>
): Promise<[MappedProduct<T>[], number]> {
  const [items, totalCount] = await promise;

  const mappedItems = setCountKey(items);
  return [mappedItems, totalCount];
}

export function setCountKey<T extends ProductWithCount>(
  items: T[]
): MappedProduct<T>[] {
  return items.map(({ _count, ...item }) => ({
    ...item,
    views: _count.views,
    chaptersCount: _count.chapters,
  }));
}

const ROUND_COUNT_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function calculateAverageProductRating(
  ratings: { rating: Decimal }[],
  ratingsCount: number
) {
  return ROUND_COUNT_FORMATTER.format(
    ratings.reduce((acc, { rating }) => acc + rating.toNumber(), 0) /
      ratingsCount
  );
}
