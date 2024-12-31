import { PaginateQuery } from "@/types";

export type ProductQuery = PaginateQuery & {
  sort?: string;
};
