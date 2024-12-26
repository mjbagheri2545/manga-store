import { Product } from "@prisma/client";

import { PaginateQuery, Permissions, PermissionsAction } from "@/types";

export type ProductQuery = PaginateQuery & {
  sort?: string;
};

export type ProductPermissionsAction = PermissionsAction;

export type ProductPermissions = Permissions<Product, ProductPermissionsAction>;
