import { Context, PropsWithChildren } from "react";

import { ApiResult, ICrudApi, ProductGroup, TGetAllResponse } from "@/types";

import ApiComponent from "../ApiComponent";

type ProductGroupProviderProps<GetAll> = PropsWithChildren & {
  Context: Context<ProductGroup[] | null>;
  getAllMethod: ICrudApi<GetAll>["getAll"];
  getEntitiesFromData: (
    result: ApiResult<TGetAllResponse<GetAll>>
  ) => ProductGroup[];
};

export function ProductGroupProvider<GetAll>({
  Context,
  children,
  getAllMethod,
  getEntitiesFromData,
}: ProductGroupProviderProps<GetAll>) {
  return (
    <ApiComponent apiMethod={() => getAllMethod(undefined)}>
      {(result) => (
        <Context.Provider value={getEntitiesFromData(result)}>
          {children}
        </Context.Provider>
      )}
    </ApiComponent>
  );
}
