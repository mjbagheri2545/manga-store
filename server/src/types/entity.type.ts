import {
  Category,
  Chapter,
  Prisma,
  Product,
  ProductStatus,
  Tag,
  User,
} from "@prisma/client";

import { PaginateQuery } from "./req.type";

export type ProductGroupModelEntityKey = "tag" | "category" | "productStatus";

export type EntityKey =
  | ProductGroupModelEntityKey
  | "user"
  | "product"
  | "chapter";

export type ProductGroupModel = Tag | Category | ProductStatus;

export type PermissionChapter = Chapter & {
  product: { managerId: string | null };
};

export type Model = ProductGroupModel | Product | User | Chapter;

export type PermissionModels = Exclude<Model, Chapter> | PermissionChapter;

type ProductGroupModelCreateInput = {
  name: string;
  slug: string;
};

type ProductGroupModelUpdateInput = Partial<ProductGroupModelCreateInput>;

export type ProductGroupModelUniquenessCheckOptions = {
  name?: string;
  slug?: string;
};

export interface IProductGroupModelService<T extends ProductGroupModel> {
  getAll: (query: PaginateQuery) => Prisma.PrismaPromise<T[]>;
  getById: (id: string) => Prisma.PrismaPromise<T | null>;
  uniquenessCheck: (
    options: ProductGroupModelUniquenessCheckOptions
  ) => Prisma.PrismaPromise<T | null>;
  count: () => Prisma.PrismaPromise<number>;
  create: (data: ProductGroupModelCreateInput) => Prisma.PrismaPromise<T>;
  update: (
    id: string,
    data?: ProductGroupModelUpdateInput
  ) => Prisma.PrismaPromise<T>;
  delete: (id: string) => Prisma.PrismaPromise<T>;
}
