import { CreateProductGroupData } from "@/schemas/productGroup.schema";
import { ProductGroup } from "@/types";
import { CrudApi } from "@/utils";

export type GetProductStatusResponse = { productStatus: ProductGroup };

export type GetAllProductStatusResponse = { productStatuses: ProductGroup[] };

const productStatusApi = new CrudApi<
  GetAllProductStatusResponse,
  GetProductStatusResponse,
  CreateProductGroupData
>("productStatus");

export default productStatusApi;
