import { Prisma, Tag } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  IProductGroupModelService,
  PaginateQuery,
  ProductGroupModelUniquenessCheckOptions,
} from "@/types";
import { paginate } from "@/utils";

class TagService implements IProductGroupModelService<Tag> {
  getAll(query: PaginateQuery) {
    return Promise.all([
      prisma.tag.findMany(paginate(query)),
      prisma.tag.count(),
    ]);
  }

  getById(id: string) {
    return prisma.tag.findUnique({ where: { id } });
  }

  uniquenessCheck({ name, slug }: ProductGroupModelUniquenessCheckOptions) {
    return prisma.tag.findFirst({ where: { OR: [{ name }, { slug }] } });
  }

  create(data: Prisma.TagCreateInput) {
    return prisma.tag.create({
      data,
    });
  }

  update(id: string, data: Prisma.TagUpdateInput = {}) {
    return prisma.tag.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.tag.delete({ where: { id } });
  }
}

const tagService = new TagService();

export default tagService;
