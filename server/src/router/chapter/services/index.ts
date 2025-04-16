import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { PaginateQueryWithSort } from "@/types";

import { CHAPTER_BASE_SELECT } from "../constants/global";
import { parseChapterQuery } from "../utils";

type CreateChapterOptions = {
  data: Pick<Prisma.ChapterCreateInput, "episode" | "chapterFile" | "status">;
  productId: string;
  translatorId: string;
};

export type GetChapterByIdOptions = Omit<Prisma.ChapterFindUniqueArgs, "where">;

class ChapterService {
  getAll(productId: string, query: PaginateQueryWithSort) {
    return Promise.all([
      prisma.chapter.findMany({
        where: { productId },
        ...parseChapterQuery(query),
        select: {
          id: true,
          chapterFile: true,
          createdAt: true,
          episode: true,
          status: true,
        },
      }),
      prisma.chapter.count({ where: { productId } }),
    ]);
  }

  getById(
    id: string,
    options: GetChapterByIdOptions = {
      select: { id: true },
    }
  ) {
    return prisma.chapter.findUnique({
      where: { id },
      ...options,
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
    return prisma.chapter.update({
      where: { id },
      data,
      select: CHAPTER_BASE_SELECT,
    });
  }

  delete(id: string) {
    return prisma.chapter.delete({
      where: { id },
      select: CHAPTER_BASE_SELECT,
    });
  }
}

const chapterService = new ChapterService();

export default chapterService;
