import { ProductGroupTable } from "@/components/ui/productGroup";

import tagApi from "../api";

function TagsTable() {
  return (
    <ProductGroupTable
      entityKey="tag"
      api={tagApi}
      getEntitiesFromData={(data) => data.tags}
    />
  );
}

export default TagsTable;
