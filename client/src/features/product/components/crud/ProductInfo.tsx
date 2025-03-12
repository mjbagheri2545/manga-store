import { EntityInfo } from "@/components/ui/crud";

import productApi from "../../api";
import PRODUCT_INFO_ITEMS from "./ProductInfoItems";

function ProductInfo() {
  return (
    <EntityInfo
      entityKey="product"
      getByIdMethod={productApi.getById}
      getEntityFromData={(data) => data.product}
      info={PRODUCT_INFO_ITEMS}
    />
  );
}

export default ProductInfo;
