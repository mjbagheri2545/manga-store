import PATH from "@/constants/path";
import { CreateProductGroupData } from "@/schemas/productGroup.schema";
import { ProductGroup } from "@/types";
import { CrudApi } from "@/utils";

export type GetTagResponse = { tag: ProductGroup };

export type GetAllTagResponse = { tags: ProductGroup[] };

const tagApi = new CrudApi<
  GetAllTagResponse,
  GetTagResponse,
  CreateProductGroupData
>(PATH.base.productGroup(PATH.base.tag));

export default tagApi;
