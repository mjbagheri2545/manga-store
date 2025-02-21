import { Route, Routes } from "react-router-dom";

import { AdminProductGroupProvider } from "@/components/ui/productGroup";
import CreateProductStatusPage from "@/pages/admin/items/productStatus/CreateProductStatusPage";
import ProductStatusesPage from "@/pages/admin/items/productStatus/ProductStatusesPage";
import ProductStatusInfoPage from "@/pages/admin/items/productStatus/ProductStatusInfoPage";
import UpdateProductStatusPage from "@/pages/admin/items/productStatus/UpdateProductStatusPage";

import AdminCrudRoutes from "./crud.routes";

function ProductStatusRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <AdminProductGroupProvider>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: ProductStatusInfoPage,
                  CreateEntityPage: CreateProductStatusPage,
                  UpdateEntityPage: UpdateProductStatusPage,
                  EntitiesPage: ProductStatusesPage,
                }}
              />
            </AdminProductGroupProvider>
          }
        />
      </Routes>
    </>
  );
}

export default ProductStatusRoutes;
