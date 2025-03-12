import { PropsWithChildren } from "react";

import { getAllProductGroups } from "@/api/productGroup.api";
import { ProductGroupsContext } from "@/contexts/ProductGroupsContext";

import ApiComponent from "../ApiComponent";

export function ProductGroupsProvider({ children }: PropsWithChildren) {
  return (
    <ApiComponent apiMethod={getAllProductGroups}>
      {(result) => (
        <ProductGroupsContext.Provider value={result.data}>
          {children}
        </ProductGroupsContext.Provider>
      )}
    </ApiComponent>
  );
}
