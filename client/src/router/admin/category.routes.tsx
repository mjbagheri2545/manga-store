import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { ProductGroup } from "@/types";

import AdminCrudRoutes from "./crud.routes";

const CategoriesPage = lazy(
  () => import("@/pages/admin/items/category/CategoriesPage")
);
const CategoryInfoPage = lazy(
  () => import("@/pages/admin/items/category/CategoryInfoPage")
);
const CreateCategoryPage = lazy(
  () => import("@/pages/admin/items/category/CreateCategoryPage")
);
const UpdateCategoryPage = lazy(
  () => import("@/pages/admin/items/category/UpdateCategoryPage")
);

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
