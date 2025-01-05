import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { PaginateQuery } from "@/types";
import { paginate } from "@/utils";

type CreateChapterOptions = {
  data: Pick<Prisma.ChapterCreateInput, "episode" | "chapterFile">;
  productId: string;
  translatorId: string;
};

class ChapterService {
  getAll(productId: string, query: PaginateQuery) {
    return prisma.chapter.findMany({
      where: { productId },
      ...paginate(query),
    });
  }

  getById(id: string) {
    return prisma.chapter.findUnique({
      where: { id },
      include: { product: { select: { managerId: true } } },
    });
  }

  create({ data, productId, translatorId }: CreateChapterOptions) {
    return prisma.chapter.create({
      data: {
        ...data,
        product: { connect: { id: productId } },
        translator: { connect: { id: translatorId } },
      },
    });
  }

  update(id: string, data: Prisma.ChapterUpdateInput = {}) {
    return prisma.chapter.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.chapter.delete({ where: { id } });
  }
}

const chapterService = new ChapterService();

export default chapterService;
