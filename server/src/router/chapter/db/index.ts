import { Prisma } from "@prisma/client";

import DbConfiguration from "@/db/configuration.db";
import { PaginateQuery } from "@/types";
import { paginate } from "@/utils";

type CreateOptions = {
  data: Pick<Prisma.ChapterCreateInput, "episode" | "chapterFile">;
  productId: string;
  translatorId: string;
};

class Db extends DbConfiguration {
  getAll(productId: string, query: PaginateQuery) {
    return this.prisma.chapter.findMany({
      where: { productId },
      ...paginate(query),
    });
  }

  getById(id: string) {
    return this.prisma.chapter.findUnique({
      where: { id },
      include: { product: { select: { managerId: true } } },
    });
  }

  create({ data, productId, translatorId }: CreateOptions) {
    return this.prisma.chapter.create({
      data: {
        ...data,
        product: { connect: { id: productId } },
        translator: { connect: { id: translatorId } },
      },
    });
  }

  update(id: string, data: Prisma.ChapterUpdateInput = {}) {
    return this.prisma.chapter.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.chapter.delete({ where: { id } });
  }
}

const DB = new Db();

export default DB;
