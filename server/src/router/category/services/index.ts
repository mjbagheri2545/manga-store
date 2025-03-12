import { Category, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  IProductGroupModelService,
  PaginateQuery,
  ProductGroupModelUniquenessCheckOptions,
} from "@/types";
import { paginate } from "@/utils";

class CategoryService implements IProductGroupModelService<Category> {
  getAll(query: PaginateQuery) {
    return Promise.all([
      prisma.category.findMany(paginate(query)),
      prisma.category.count(),
    ]);
  }

  getById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  uniquenessCheck({ name, slug }: ProductGroupModelUniquenessCheckOptions) {
    return prisma.category.findFirst({ where: { OR: [{ name }, { slug }] } });
  }

  create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({
      data,
    });
  }

  update(id: string, data: Prisma.CategoryUpdateInput = {}) {
    return prisma.category.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}

const categoryService = new CategoryService();

export default categoryService;
