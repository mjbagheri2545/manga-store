import { ProductGroupTable } from "@/components/ui/productGroup";

import tagApi from "../api";

function TagTable() {
  return (
    <ProductGroupTable
      entityKey="tag"
      api={tagApi}
      getEntitiesFromData={(data) => data.tags}
    />
  );
}

export default TagTable;
