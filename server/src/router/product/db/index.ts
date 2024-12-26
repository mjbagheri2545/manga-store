import { Prisma } from "@prisma/client";

import DbConfiguration from "@/db/configuration.db";

import { ProductQuery } from "../types";
import { parseQuery } from "../utils";

type CreateProductOptions = {
  data: Omit<Prisma.ProductCreateInput, "manager" | "category" | "tags">;
  managerId: string;
  categoryId: string;
  statusId: string;
  tagsId: string[];
};

type UpdateProductOptions = {
  id: string;
  data: Prisma.ProductUpdateInput;
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

  getAll(query: ProductQuery) {
    return this.prisma.product.findMany(parseQuery(query));
  }

  getById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  getByProductSlug(productSlug: string) {
    return this.prisma.product.findUnique({ where: { slug: productSlug } });
  }

  getByCategory(categorySlug: string, query: ProductQuery) {
    return this.prisma.product.findMany({
      where: { category: { slug: categorySlug } },
      ...parseQuery(query),
    });
  }

  getByTag(tagSlug: string, query: ProductQuery) {
    return this.prisma.product.findMany({
      where: { tags: { every: { slug: tagSlug } } },
      ...parseQuery(query),
    });
  }

  getByStatus(statusSlug: string, query: ProductQuery) {
    return this.prisma.product.findMany({
      where: { status: { slug: statusSlug } },
      ...parseQuery(query),
    });
  }

  update({ id, data = {} }: UpdateProductOptions) {
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
