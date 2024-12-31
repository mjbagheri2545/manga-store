import { Prisma } from "@prisma/client";

import DbConfiguration from "@/db/configuration.db";

class Db extends DbConfiguration {
  getAll() {
    return this.prisma.productStatus.findMany();
  }

  getById(id: string) {
    return this.prisma.productStatus.findUnique({ where: { id } });
  }

  create(data: Prisma.ProductStatusCreateInput) {
    return this.prisma.productStatus.create({
      data,
    });
  }

  update(id: string, data: Prisma.ProductStatusUpdateInput = {}) {
    return this.prisma.productStatus.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.productStatus.delete({ where: { id } });
  }
}

const DB = new Db();

export default DB;
