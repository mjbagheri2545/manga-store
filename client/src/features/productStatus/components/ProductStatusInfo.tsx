import { EntityInfo } from "@/components/ui/crud";
import { PRODUCT_GROUP_INFO_ITEMS } from "@/components/ui/productGroup/ProductGroupInfoItems";

import productStatusApi from "../api";

function ProductStatusInfo() {
  return (
    <EntityInfo
      entityKey="productStatus"
      getByIdMethod={productStatusApi.getById}
      getEntityFromData={(data) => data.productStatus}
      info={PRODUCT_GROUP_INFO_ITEMS}
    />
  );
}

export default ProductStatusInfo;
