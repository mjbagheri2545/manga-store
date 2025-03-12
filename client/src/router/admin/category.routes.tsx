import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import CategoriesPage from "@/pages/admin/items/category/CategoriesPage";
import CategoryInfoPage from "@/pages/admin/items/category/CategoryInfoPage";
import CreateCategoryPage from "@/pages/admin/items/category/CreateCategoryPage";
import UpdateCategoryPage from "@/pages/admin/items/category/UpdateCategoryPage";
import { ProductGroup } from "@/types";

import AdminCrudRoutes from "./crud.routes";

function CategoryRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <EntitiesProvider<ProductGroup>>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: CategoryInfoPage,
                  CreateEntityPage: CreateCategoryPage,
                  UpdateEntityPage: UpdateCategoryPage,
                  EntitiesPage: CategoriesPage,
                }}
              />
            </EntitiesProvider>
          }
        />
      </Routes>
    </>
  );
}

export default CategoryRoutes;
