import { EntityInfo } from "@/components/ui/crud";
import { PRODUCT_GROUP_PAGE_INFO } from "@/constants/global/features/productGroup.global";

import productStatusApi from "../api";

function ProductStatusInfo() {
  return (
    <EntityInfo
      entityKey="productStatus"
      getByIdMethod={productStatusApi.getById}
      getEntityFromResult={(data) => data.productStatus}
      info={PRODUCT_GROUP_PAGE_INFO}
    />
  );
}

export default ProductStatusInfo;
