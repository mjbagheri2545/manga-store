import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import CreateProductStatusPage from "@/pages/admin/items/productStatus/CreateProductStatusPage";
import ProductStatusesPage from "@/pages/admin/items/productStatus/ProductStatusesPage";
import ProductStatusInfoPage from "@/pages/admin/items/productStatus/ProductStatusInfoPage";
import UpdateProductStatusPage from "@/pages/admin/items/productStatus/UpdateProductStatusPage";
import { ProductGroup } from "@/types";

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
