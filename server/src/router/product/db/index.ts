import { Prisma } from "@prisma/client";

import DbConfiguration from "@/db/configuration.db";
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

class ProductDb extends DbConfiguration {
  create({
    data,
    managerId,
    categoryId,
    statusId,
    tagsId,
  }: CreateProductOptions) {
    const tagsData = tagsId.map((id) => ({ id }));

    return this.prisma.product.create({
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
    return this.prisma.product.findMany(parseQuery(query));
  }

  getById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        tags: { select: { id: true } },
      },
    });
  }

  getByProductSlug(productSlug: string) {
    return this.prisma.product.findUnique({
      where: { slug: productSlug },
      include: {
        averageRating: { select: { rating: true } },
        category: { select: { name: true, slug: true } },
        status: { select: { name: true, slug: true } },
        tags: { select: { name: true, slug: true } },
        chapters: { select: { translator: true, episode: true } },
      },
    });
  }

  getByCategory(categorySlug: string, query: ProductQuery) {
    return this.prisma.product.findMany({
      where: { category: { slug: categorySlug } },
      ...parseQuery(query),
      select: this.getSelectProducts(),
    });
  }

  getByTag(tagSlug: string, query: ProductQuery) {
    return this.prisma.product.findMany({
      where: { tags: { every: { slug: tagSlug } } },
      ...parseQuery(query),
      select: this.getSelectProducts(),
    });
  }

  getByStatus(statusSlug: string, query: ProductQuery) {
    return this.prisma.product.findMany({
      where: { status: { slug: statusSlug } },
      ...parseQuery(query),
      select: this.getSelectProducts(),
    });
  }

  update(id: string, data: Prisma.ProductUpdateInput = {}) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  updateRating({ productId, ratedById, rating }: UpdateRatingOptions) {
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        averageRating: {
          connectOrCreate: {
            where: { productId },
            create: { ratedById, rating },
          },
        },
      },
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}

const DB = new ProductDb();

export default DB;
