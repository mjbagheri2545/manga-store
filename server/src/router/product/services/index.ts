import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { StrictOmit } from "@/types";
import { AutoBind } from "@/utils";

import { ProductQuery } from "../types";
import { parseProductQuery } from "../utils";

type CreateProductOptions = {
  data: StrictOmit<Prisma.ProductCreateInput, "manager" | "category" | "tags">;
  managerId: string;
  categoryId: string;
  statusId: string;
  tagsId: string[];
};

type UpdateRatingOptions = {
  productId: string;
  ratedById: string;
  rating: number;
};

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
      priceInRials: true,
      productImage: true,
      slug: true,
      id: true,
      _count: { select: { chapters: true } },
      tags: true,
    };
  }

  getProductGroups() {
    return Promise.all([
      prisma.category.findMany(),
      prisma.tag.findMany(),
      prisma.productStatus.findMany(),
    ]);
  }

  getAll(query: ProductQuery) {
    const parsedQuery = parseProductQuery(query);

    return Promise.all([
      prisma.product.findMany({
        ...parsedQuery,
        select: {
          manager: { select: { fullName: true } },
          category: true,
          ...this.productSelectBase(),
        },
      }),
      prisma.product.count({ where: parsedQuery.where }),
    ]);
  }

  getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        tags: { select: { id: true } },
        category: { select: { id: true } },
        status: { select: { id: true } },
        manager: { select: { id: true } },
      },
    });
  }

  getBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        averageRating: { select: { rating: true } },
        chapters: {
          select: {
            translator: {
              select: { fullName: true },
            },
            episode: true,
            id: true,
          },
        },
        category: true,
        tags: true,
        status: true,
      },
    });
  }

  getByCategory(categorySlug: string, query: ProductQuery) {
    const parsedQuery = parseProductQuery(query);
    const where = { category: { slug: categorySlug }, ...parsedQuery.where };

    return Promise.all([
      prisma.product.findMany({
        ...parsedQuery,
        where,
        select: this.productSelectBase(),
      }),
      prisma.product.count({ where }),
    ]);
  }

  getByTag(tagSlug: string, query: ProductQuery) {
    const parsedQuery = parseProductQuery(query);
    const where = {
      tags: { some: { slug: tagSlug } },
      ...parsedQuery.where,
    };

    return Promise.all([
      prisma.product.findMany({
        ...parsedQuery,
        where,
        select: this.productSelectBase(),
      }),
      prisma.product.count({ where }),
    ]);
  }

  update(id: string, data: Prisma.ProductUpdateInput = {}) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  updateRating({ productId, ratedById, rating }: UpdateRatingOptions) {
    return prisma.product.update({
      where: { id: productId },
      data: {
        averageRating: {
          upsert: {
            where: { productId, ratedById },
            create: { ratedById, rating },
            update: { rating },
          },
        },
      },
      include: { averageRating: { select: { rating: true } } },
    });
  }

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}

const productService = new ProductService();

export default productService;
