import { EntityInfo } from "@/components/ui/crud";
import { PRODUCT_GROUP_INFO_ITEMS } from "@/components/ui/productGroup/ProductGroupInfoItems";

import categoryApi from "../api";

function CategoryInfo() {
  return (
    <EntityInfo
      entityKey="category"
      getByIdMethod={categoryApi.getById}
      getEntityFromData={(data) => data.category}
      info={PRODUCT_GROUP_INFO_ITEMS}
    />
  );
}

export default CategoryInfo;
