import { Prisma, Tag } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { GroupingModelsService } from "@/types";

class TagService implements GroupingModelsService<Tag> {
  getAll() {
    return prisma.tag.findMany();
  }

  getById(id: string) {
    return prisma.tag.findUnique({ where: { id } });
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
