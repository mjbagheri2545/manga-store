import { EntityInfo } from "@/components/ui/crud";
import { PRODUCT_GROUP_PAGE_INFO } from "@/constants/global/features/productGroup.global";

import categoryApi from "../api";

function CategoryInfo() {
  return (
    <EntityInfo
      entityKey="category"
      getByIdMethod={categoryApi.getById}
      getEntityFromResult={(data) => data.category}
      info={PRODUCT_GROUP_PAGE_INFO}
    />
  );
}

export default CategoryInfo;
