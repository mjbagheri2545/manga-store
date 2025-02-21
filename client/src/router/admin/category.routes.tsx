import { Route, Routes } from "react-router-dom";

import { AdminProductGroupProvider } from "@/components/ui/productGroup";
import CategoriesPage from "@/pages/admin/items/category/CategoriesPage";
import CategoryInfoPage from "@/pages/admin/items/category/CategoryInfoPage";
import CreateCategoryPage from "@/pages/admin/items/category/CreateCategoryPage";
import UpdateCategoryPage from "@/pages/admin/items/category/UpdateCategoryPage";

import AdminCrudRoutes from "./crud.routes";

function CategoryRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <AdminProductGroupProvider>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: CategoryInfoPage,
                  CreateEntityPage: CreateCategoryPage,
                  UpdateEntityPage: UpdateCategoryPage,
                  EntitiesPage: CategoriesPage,
                }}
              />
            </AdminProductGroupProvider>
          }
        />
      </Routes>
    </>
  );
}

export default CategoryRoutes;
