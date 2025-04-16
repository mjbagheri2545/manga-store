import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { ProductGroup } from "@/types";

const ProductStatusesPage = lazy(
  () => import("@/pages/admin/items/productStatus/ProductStatusesPage")
);
const ProductStatusInfoPage = lazy(
  () => import("@/pages/admin/items/productStatus/ProductStatusInfoPage")
);
const CreateProductStatusPage = lazy(
  () => import("@/pages/admin/items/productStatus/CreateProductStatusPage")
);
const UpdateProductStatusPage = lazy(
  () => import("@/pages/admin/items/productStatus/UpdateProductStatusPage")
);

import AdminCrudRoutes from "./crud.routes";

function ProductStatusRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <EntitiesProvider<ProductGroup>>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: ProductStatusInfoPage,
                  CreateEntityPage: CreateProductStatusPage,
                  UpdateEntityPage: UpdateProductStatusPage,
                  EntitiesPage: ProductStatusesPage,
                }}
              />
            </EntitiesProvider>
          }
        />
      </Routes>
    </>
  );
}

export default ProductStatusRoutes;
