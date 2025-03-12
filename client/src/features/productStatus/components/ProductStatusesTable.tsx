import { ProductGroupTable } from "@/components/ui/productGroup";

import productStatusApi from "../api";

function ProductStatusesTable() {
  return (
    <ProductGroupTable
      entityKey="productStatus"
      api={productStatusApi}
      getEntitiesFromData={(data) => data.productStatuses}
    />
  );
}

export default ProductStatusesTable;
