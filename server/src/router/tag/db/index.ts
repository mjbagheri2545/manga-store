import { Prisma } from "@prisma/client";

import DbConfiguration from "@/db/configuration.db";

class Db extends DbConfiguration {
  getAll() {
    return this.prisma.tag.findMany();
  }

  getById(id: string) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  create(data: Prisma.TagCreateInput) {
    return this.prisma.tag.create({
      data,
    });
  }

  update(id: string, data: Prisma.TagUpdateInput = {}) {
    return this.prisma.tag.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.tag.delete({ where: { id } });
  }
}

const DB = new Db();

export default DB;
