import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { StrictOmit } from "@/types";

import { ProductQuery } from "../types";
import { parseQuery } from "../utils";

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

class ProductService {
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

  private getSelectProducts() {
    return {
      _count: { select: { chapters: true } },
      status: { select: { name: true, slug: true } },
      name: true,
      productImage: true,
      slug: true,
    };
  }

  getAll(query: ProductQuery) {
    return prisma.product.findMany(parseQuery(query));
  }

  getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        tags: { select: { id: true } },
      },
    });
  }

  getByProductSlug(productSlug: string) {
    const groupingModelSelect = { select: { name: true, slug: true } };

    return prisma.product.findUnique({
      where: { slug: productSlug },
      include: {
        averageRating: { select: { rating: true } },
        category: groupingModelSelect,
        status: groupingModelSelect,
        tags: groupingModelSelect,
        chapters: { select: { translator: true, episode: true } },
      },
    });
  }

  getByCategory(categorySlug: string, query: ProductQuery) {
    return prisma.product.findMany({
      where: { category: { slug: categorySlug } },
      ...parseQuery(query),
      select: this.getSelectProducts(),
    });
  }

  getByTag(tagSlug: string, query: ProductQuery) {
    return prisma.product.findMany({
      where: { tags: { every: { slug: tagSlug } } },
      ...parseQuery(query),
      select: this.getSelectProducts(),
    });
  }

  getByStatus(statusSlug: string, query: ProductQuery) {
    return prisma.product.findMany({
      where: { status: { slug: statusSlug } },
      ...parseQuery(query),
      select: this.getSelectProducts(),
    });
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
          connectOrCreate: {
            where: { productId_ratedById: { productId, ratedById } },
            create: { ratedById, rating },
          },
        },
      },
      include: { averageRating: true },
    });
  }

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}

const productService = new ProductService();

export default productService;
