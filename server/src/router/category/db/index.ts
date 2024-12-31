import { Prisma } from "@prisma/client";

import DbConfiguration from "@/db/configuration.db";

class Db extends DbConfiguration {
  getAll() {
    return this.prisma.category.findMany();
  }

  getById(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data,
    });
  }

  update(id: string, data: Prisma.CategoryUpdateInput = {}) {
    return this.prisma.category.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}

const DB = new Db();

export default DB;
