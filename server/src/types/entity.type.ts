import {
  Category,
  Chapter,
  Prisma,
  Product,
  ProductComment,
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
  | "chapter"
  | "productComment";

export type ProductGroupModel = Tag | Category | ProductStatus;

export type PermissionChapter = Pick<
  Chapter,
  "id" | "chapterFile" | "translatorId"
> & {
  product: Pick<Product, "managerId">;
};

export type PermissionProductComment = Pick<
  ProductComment,
  "id" | "authorId"
> & {
  product: Pick<Product, "managerId">;
};

export type PermissionUser = Pick<User, "id" | "avatarImage">;
export type PermissionProduct = Pick<
  Product,
  "id" | "managerId" | "productImage"
>;

export type PermissionModels =
  | ProductGroupModel
  | PermissionProduct
  | PermissionChapter
  | PermissionProductComment
  | PermissionUser;

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
  getAll: (query: PaginateQuery) => Promise<[T[], number]>;
  getById: (id: string) => Prisma.PrismaPromise<T | null>;
  uniquenessCheck: (
    options: ProductGroupModelUniquenessCheckOptions
  ) => Prisma.PrismaPromise<T | null>;
  create: (data: ProductGroupModelCreateInput) => Prisma.PrismaPromise<T>;
  update: (
    id: string,
    data?: ProductGroupModelUpdateInput
  ) => Prisma.PrismaPromise<T>;
  delete: (id: string) => Prisma.PrismaPromise<T>;
}
