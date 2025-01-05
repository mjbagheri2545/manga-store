import { Category, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { GroupingModelsService } from "@/types";

class CategoryService implements GroupingModelsService<Category> {
  getAll() {
    return prisma.category.findMany();
  }

  getById(id: string) {
    return prisma.category.findUnique({ where: { id } });
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
