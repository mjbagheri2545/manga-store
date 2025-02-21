import { EntityInfo } from "@/components/ui/crud";
import { PRODUCT_GROUP_PAGE_INFO } from "@/constants/global/features/productGroup.global";

import tagApi from "../api";

function TagInfo() {
  return (
    <EntityInfo
      entityKey="tag"
      getByIdMethod={tagApi.getById}
      getEntityFromResult={(data) => data.tag}
      info={PRODUCT_GROUP_PAGE_INFO}
    />
  );
}

export default TagInfo;
