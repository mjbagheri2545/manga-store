import PATH from "@/constants/path";
import { CreateProductGroupData } from "@/schemas/productGroup.schema";
import { ProductGroup } from "@/types";
import { CrudApi } from "@/utils";

export type CategoryResponse = { category: ProductGroup };

export type GetAllCategoryResponse = { categories: ProductGroup[] };

const categoryApi = new CrudApi<
  GetAllCategoryResponse,
  CategoryResponse,
  CreateProductGroupData
>(PATH.base.productGroup(PATH.base.category));

export default categoryApi;
