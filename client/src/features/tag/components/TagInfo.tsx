import { EntityInfo } from "@/components/ui/crud";
import { PRODUCT_GROUP_INFO_ITEMS } from "@/components/ui/productGroup/ProductGroupInfoItems";

import tagApi from "../api";

function TagInfo() {
  return (
    <EntityInfo
      entityKey="tag"
      getByIdMethod={tagApi.getById}
      getEntityFromData={(data) => data.tag}
      info={PRODUCT_GROUP_INFO_ITEMS}
    />
  );
}

export default TagInfo;
