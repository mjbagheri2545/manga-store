import { useCallback } from "react";

import { ProductGroupTable } from "@/components/ui/productGroup";
import { TGetAllResponse } from "@/types";

import categoryApi, { GetAllCategoryResponse } from "../api";

function CategoriesTable() {
  const getEntitiesFromData = useCallback(
    (data: TGetAllResponse<GetAllCategoryResponse>) => data.categories,
    []
  );

  return (
    <ProductGroupTable
      entityKey="category"
      api={categoryApi}
      getEntitiesFromData={getEntitiesFromData}
    />
  );
}

export default CategoriesTable;
