import {
  Category,
  Chapter,
  Prisma,
  Product,
  ProductStatus,
  Tag,
  User,
} from "@prisma/client";

export type GroupingModelsEntityKey = "tag" | "category" | "productStatus";

export type EntityKey =
  | GroupingModelsEntityKey
  | "user"
  | "product"
  | "chapter";

export type GroupingModels = Tag | Category | ProductStatus;

export type PermissionChapter = Chapter & {
  product: { managerId: string | null };
};

export type EntityModels = GroupingModels | Product | User | Chapter;

export type PermissionModels =
  | Exclude<EntityModels, Chapter>
  | PermissionChapter;

type GroupingModelsCreateInput = {
  name: string;
  slug: string;
};

type GroupingModelsUpdateInput = Partial<GroupingModelsCreateInput>;

export interface GroupingModelsService<T extends GroupingModels> {
  getAll: () => Prisma.PrismaPromise<T[]>;
  getById: (id: string) => Prisma.PrismaPromise<T | null>;
  create: (data: GroupingModelsCreateInput) => Prisma.PrismaPromise<T>;
  update: (
    id: string,
    data?: GroupingModelsUpdateInput
  ) => Prisma.PrismaPromise<T>;
  delete: (id: string) => Prisma.PrismaPromise<T>;
}
