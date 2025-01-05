import { Prisma, ProductStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { GroupingModelsService } from "@/types";

class ProductStatusService implements GroupingModelsService<ProductStatus> {
  getAll() {
    return prisma.productStatus.findMany();
  }

  getById(id: string) {
    return prisma.productStatus.findUnique({ where: { id } });
  }

  create(data: Prisma.ProductStatusCreateInput) {
    return prisma.productStatus.create({
      data,
    });
  }

  update(id: string, data: Prisma.ProductStatusUpdateInput = {}) {
    return prisma.productStatus.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.productStatus.delete({ where: { id } });
  }
}

const productStatusService = new ProductStatusService();

export default productStatusService;
