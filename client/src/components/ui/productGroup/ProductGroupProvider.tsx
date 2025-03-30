import { Context, PropsWithChildren } from "react";

import { ICrudApi, ProductGroup, TGetAllResponse } from "@/types";

import { ApiComponent } from "../api";

type ProductGroupProviderProps<GetAll> = PropsWithChildren & {
  Context: Context<ProductGroup[] | null>;
  getAllMethod: ICrudApi<GetAll>["getAll"];
  getEntitiesFromData: (data: TGetAllResponse<GetAll>) => ProductGroup[];
};

export function ProductGroupProvider<GetAll>({
  Context,
  children,
  getAllMethod,
  getEntitiesFromData,
}: ProductGroupProviderProps<GetAll>) {
  return (
    <ApiComponent apiMethod={() => getAllMethod(undefined)}>
      {(data) => (
        <Context.Provider value={getEntitiesFromData(data)}>
          {children}
        </Context.Provider>
      )}
    </ApiComponent>
  );
}
