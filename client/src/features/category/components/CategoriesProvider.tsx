import { PropsWithChildren } from "react";

import { ProductGroupProvider } from "@/components/ui/productGroup";

import categoryApi from "../api";
import { CategoriesContext } from "../contexts";

function CategoriesProvider({ children }: PropsWithChildren) {
  return (
    <ProductGroupProvider
      Context={CategoriesContext}
      getAllMethod={categoryApi.getAll}
      getEntitiesFromData={(result) => result.data.categories}
    >
      {children}
    </ProductGroupProvider>
  );
}

export default CategoriesProvider;
