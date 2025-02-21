import { ProductGroupTable } from "@/components/ui/productGroup";

import productStatusApi from "../api";

function ProductStatusTable() {
  return (
    <ProductGroupTable
      entityKey="productStatus"
      api={productStatusApi}
      getEntitiesFromData={(data) => data.productStatuses}
    />
  );
}

export default ProductStatusTable;
