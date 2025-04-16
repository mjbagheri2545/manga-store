import { Prisma, Product } from "@prisma/client";

import { GET_ALL_PRODUCT_COMMENTS_SELECT } from "@/constants/global/features/product_productComment.global";
import { prisma } from "@/lib/prisma";
import { PaginateQueryWithSort, ProductGroupModel, StrictOmit } from "@/types";
import { AutoBind, paginate, parseQuerySort } from "@/utils";

import { PRODUCT_BASE_SELECT } from "../constants/global";
import { ProductQuery } from "../types";
import {
  MappedProduct,
  parseProductQuery,
  setCountKey,
  setCountKeyWithTotalCount,
} from "../utils";

type CreateProductOptions = {
  data: StrictOmit<Prisma.ProductCreateInput, "manager" | "category" | "tags">;
  managerId: string;
  categoryId: string;
  statusId: string;
  tagsId: string[];
};

type RateOptions = {
  productId: string;
  ratedById: string;
  ratingNumber: number;
};

export type GetProductByIdOptions = Omit<Prisma.ProductFindUniqueArgs, "where">;

type ProductSelect = Pick<
  Product,
  | "id"
  | "name"
  | "oneChapterPriceInToman"
  | "productImage"
  | "slug"
  | "summary"
  | "releaseYear"
> & {
  status: ProductGroupModel;
  tags: ProductGroupModel[];
  _count: { chapters: number; views: number };
};

const TRANSLATOR_LIMIT = 10;
const SINGLE_PRODUCT_ENTITY_TAKE = 4;
class ProductService extends AutoBind {
  create({
    data,
    managerId,
    categoryId,
    statusId,
    tagsId,
  }: CreateProductOptions) {
    const tagsData = tagsId.map((id) => ({ id }));

    return prisma.product.create({
      data: {
        ...data,
        manager: { connect: { id: managerId } },
        category: { connect: { id: categoryId } },
        tags: { connect: tagsData },
        status: { connect: { id: statusId } },
      },
    });
  }

  private productSelectBase() {
    return {
      status: true,
      name: true,
      oneChapterPriceInToman: true,
      productImage: true,
      slug: true,
      id: true,
      _count: { select: { chapters: true, views: true } },
      tags: true,
      summary: true,
      releaseYear: true,
    };
  }

  getProductGroups() {
    return Promise.all([
      prisma.category.findMany(),
      prisma.tag.findMany(),
      prisma.productStatus.findMany(),
    ]);
  }

  private async getByRating(
    query: ProductQuery
  ): Promise<[MappedProduct<ProductSelect>[], number]> {
    const parsedQuery = parseProductQuery(query);

    const items = await prisma.productRating.groupBy({
      by: ["productId"],
      _avg: { rating: true },
      where: {
        product: parsedQuery.where,
      },
      orderBy: { _avg: { rating: "desc" } },
      skip: parsedQuery.skip,
      take: parsedQuery.take,
    });

    const productIds = items.map((item) => item.productId);

    const [products, totalCount] = await setCountKeyWithTotalCount(
      Promise.all([
        prisma.product.findMany({
          where: { id: { in: productIds } },
          select: this.productSelectBase(),
        }),
        prisma.product.count(),
      ])
    );

    const sortedProducts = productIds.map((id) =>
      products.find((product) => product.id === id)
    ) as typeof products;

    return [sortedProducts, totalCount];
  }

  getAll(query: ProductQuery) {
    if (query.sort === "high-rated") {
      return this.getByRating(query);
    }

    const parsedQuery = parseProductQuery(query);

    return setCountKeyWithTotalCount(
      Promise.all([
        prisma.product.findMany({
          ...parsedQuery,
          select: {
            manager: { select: { fullName: true } },
            category: true,
            ...this.productSelectBase(),
          },
        }),
        prisma.product.count({ where: parsedQuery.where }),
      ])
    );
  }

  getById(
    id: string,
    options: GetProductByIdOptions = { select: { id: true } }
  ) {
    return prisma.product.findUnique({
      where: { id },
      ...options,
    });
  }

  uniquenessValidationBySlug(slug: string) {
    return prisma.product.findUnique({ where: { slug }, select: { id: true } });
  }

  getBySlug(slug: string, viewerId: string) {
    return Promise.all([
      prisma.$transaction(async (trx) => {
        const product = await trx.product.findUnique({
          where: { slug },
          include: {
            ratings: { select: { rating: true, ratedById: true } },
            chapters: {
              where: { status: "public" },
              select: {
                episode: true,
                id: true,
              },
              take: SINGLE_PRODUCT_ENTITY_TAKE,
              orderBy: { createdAt: "desc" },
            },
            comments: {
              where: { parentId: null },
              select: GET_ALL_PRODUCT_COMMENTS_SELECT,
              orderBy: { createdAt: "desc" },
              take: SINGLE_PRODUCT_ENTITY_TAKE,
            },
            category: true,
            tags: true,
            status: true,
            _count: { select: { chapters: true, ratings: true, views: true } },
          },
        });

        if (product == null) {
          return;
        }

        const view = await trx.productView.findUnique({
          where: {
            productId_viewerId: {
              viewerId,
              productId: product.id,
            },
          },
        });

        if (view == null) {
          await trx.productView.create({
            data: { productId: product.id, viewerId },
          });

          return {
            ...product,
            _count: { ...product._count, views: product._count.views + 1 },
          };
        }

        return product;
      }),
      prisma.user.findMany({
        where: { translatedChapters: { some: { product: { slug } } } },
        select: {
          fullName: true,
          id: true,
          _count: {
            select: {
              translatedChapters: { where: { product: { slug } } },
            },
          },
        },
        skip: 0,
        take: SINGLE_PRODUCT_ENTITY_TAKE,
      }),
    ]);
  }

  getByCategory(categorySlug: string, query: ProductQuery) {
    const parsedQuery = parseProductQuery(query);
    const where = { category: { slug: categorySlug }, ...parsedQuery.where };

    return setCountKeyWithTotalCount(
      Promise.all([
        prisma.product.findMany({
          ...parsedQuery,
          where,
          select: this.productSelectBase(),
        }),
        prisma.product.count({ where }),
      ])
    );
  }

  getByTag(tagSlug: string, query: ProductQuery) {
    const parsedQuery = parseProductQuery(query);
    const where = {
      tags: { some: { slug: tagSlug } },
      ...parsedQuery.where,
    };

    return setCountKeyWithTotalCount(
      Promise.all([
        prisma.product.findMany({
          ...parsedQuery,
          where,
          select: this.productSelectBase(),
        }),
        prisma.product.count({ where }),
      ])
    );
  }

  async getRelatedProducts(categoryId: string, tagsId: string[]) {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { category: { id: categoryId } },
          { tags: { some: { id: { in: tagsId } } } },
        ],
      },
      take: 10,
      select: this.productSelectBase(),
    });

    return setCountKey(products);
  }

  async getRelatedTranslators(id: string, query: PaginateQueryWithSort) {
    const where = {
      translatedChapters: { some: { product: { id } } },
    };

    const countDbQuery = prisma.user.count({ where });
    const parsedPaginateQuery = paginate(query);

    if (query.sort === "most-translated-chapters-count") {
      const dbQuery = prisma.$queryRaw`
        WITH chapters_count AS (
          SELECT
            c."translatorId",
            COUNT(c.id) AS translated_chapters_count
          FROM "Chapter" c
          JOIN "Product" p ON c."productId" = p."id"
          WHERE p."id" = ${id}
          GROUP BY c."translatorId"
        )
        SELECT
          u."id",
          u."fullName",
          cc.translated_chapters_count
        FROM "User" u
        JOIN chapters_count cc
          ON u.id = cc."translatorId"
        ORDER BY cc.translated_chapters_count DESC NULLS LAST
        LIMIT ${parsedPaginateQuery.take ?? TRANSLATOR_LIMIT} OFFSET ${parsedPaginateQuery.skip ?? 0};
        `;

      const [relatedTranslators, count] = (await Promise.all([
        dbQuery,
        countDbQuery,
      ])) as [
        { id: string; fullName: string; translated_chapters_count: bigint }[],
        number,
      ];

      const finalRelatedTranslators = relatedTranslators.map(
        ({ translated_chapters_count, ...restData }) => ({
          ...restData,
          translatedChaptersCount: Number(translated_chapters_count),
        })
      );

      return [finalRelatedTranslators, count];
    }

    const parsedQuerySort = parseQuerySort(query.sort);

    const [relatedTranslators, count] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          _count: {
            select: {
              translatedChapters: { where: { product: { id } } },
            },
          },
        },
        ...parsedPaginateQuery,
        orderBy: parsedQuerySort,
      }),
      countDbQuery,
    ]);

    const finalRelatedTranslators = relatedTranslators.map(
      ({ _count, ...restData }) => ({
        ...restData,
        translatedChaptersCount: _count.translatedChapters,
      })
    );

    return [finalRelatedTranslators, count];
  }

  update(id: string, data: Prisma.ProductUpdateInput = {}) {
    return prisma.product.update({
      where: { id },
      data,
      select: PRODUCT_BASE_SELECT,
    });
  }

  async rate({ productId, ratedById, ratingNumber }: RateOptions) {
    return prisma.productRating.upsert({
      where: { productId_ratedById: { productId, ratedById } },
      create: { productId, ratedById, rating: ratingNumber },
      update: { rating: ratingNumber },
      select: {
        product: {
          select: {
            _count: { select: { ratings: true } },
            ratings: { select: { rating: true, ratedById: true } },
          },
        },
      },
    });
  }

  delete(id: string) {
    return prisma.product.delete({
      where: { id },
      select: PRODUCT_BASE_SELECT,
    });
  }
}

const productService = new ProductService();

export default productService;
