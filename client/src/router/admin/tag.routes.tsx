import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//AdminTagsPage because also we have TagsPage
import { EntitiesProvider } from "@/components/ui/crud";
import { ProductGroup } from "@/types";

import AdminCrudRoutes from "./crud.routes";

const AdminTagsPage = lazy(
  () => import("@/pages/admin/items/tag/AdminTagsPage")
);
const TagInfoPage = lazy(() => import("@/pages/admin/items/tag/TagInfoPage"));
const CreateTagPage = lazy(
  () => import("@/pages/admin/items/tag/CreateTagPage")
);
const UpdateTagPage = lazy(
  () => import("@/pages/admin/items/tag/UpdateTagPage")
);

function TagRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <EntitiesProvider<ProductGroup>>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: TagInfoPage,
                  CreateEntityPage: CreateTagPage,
                  UpdateEntityPage: UpdateTagPage,
                  EntitiesPage: AdminTagsPage,
                }}
              />
            </EntitiesProvider>
          }
        />
      </Routes>
    </>
  );
}

export default TagRoutes;
