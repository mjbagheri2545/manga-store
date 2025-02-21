import { Prisma, ProductStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  IProductGroupModelService,
  PaginateQuery,
  ProductGroupModelUniquenessCheckOptions,
} from "@/types";
import { paginate } from "@/utils";

class ProductStatusService implements IProductGroupModelService<ProductStatus> {
  getAll(query: PaginateQuery) {
    return prisma.productStatus.findMany(paginate(query));
  }

  getById(id: string) {
    return prisma.productStatus.findUnique({ where: { id } });
  }

  uniquenessCheck({ name, slug }: ProductGroupModelUniquenessCheckOptions) {
    return prisma.productStatus.findFirst({
      where: { OR: [{ name }, { slug }] },
    });
  }

  count() {
    return prisma.productStatus.count();
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
