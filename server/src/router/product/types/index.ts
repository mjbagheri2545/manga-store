import { PaginateQueryWithSort } from "@/types";

export type ProductQuery = PaginateQueryWithSort & {
  status?: string;
  name?: string;
};
