import { PropsWithChildren } from "react";

import { ProductGroupProvider } from "@/components/ui/productGroup";

import productStatusApi from "../api";
import { ProductStatusesContext } from "../contexts";

function ProductStatusesProvider({ children }: PropsWithChildren) {
  return (
    <ProductGroupProvider
      Context={ProductStatusesContext}
      getAllMethod={productStatusApi.getAll}
      getEntitiesFromData={(result) => result.data.productStatuses}
    >
      {children}
    </ProductGroupProvider>
  );
}

export default ProductStatusesProvider;
