import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { CrudProduct } from "@/features/product/api";
import CreateProductPage from "@/pages/admin/items/product/crud/CreateProductPage";
import ProductInfoPage from "@/pages/admin/items/product/crud/ProductInfoPage";
import ProductsPage from "@/pages/admin/items/product/crud/ProductsPage";
import UpdateProductPage from "@/pages/admin/items/product/crud/UpdateProductPage";

import AdminCrudRoutes from "./crud.routes";

function ProductRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <EntitiesProvider<CrudProduct>>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: ProductInfoPage,
                  CreateEntityPage: CreateProductPage,
                  UpdateEntityPage: UpdateProductPage,
                  EntitiesPage: ProductsPage,
                }}
              />
            </EntitiesProvider>
          }
        />
      </Routes>
    </>
  );
}

export default ProductRoutes;
