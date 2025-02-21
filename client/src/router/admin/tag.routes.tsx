import { Route, Routes } from "react-router-dom";

import { AdminProductGroupProvider } from "@/components/ui/productGroup";
import CreateTagPage from "@/pages/admin/items/tag/CreateTagPage";
import TagInfoPage from "@/pages/admin/items/tag/TagInfoPage";
import TagsPage from "@/pages/admin/items/tag/TagsPage";
import UpdateTagPage from "@/pages/admin/items/tag/UpdateTagPage";

import AdminCrudRoutes from "./crud.routes";

function TagRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <AdminProductGroupProvider>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: TagInfoPage,
                  CreateEntityPage: CreateTagPage,
                  UpdateEntityPage: UpdateTagPage,
                  EntitiesPage: TagsPage,
                }}
              />
            </AdminProductGroupProvider>
          }
        />
      </Routes>
    </>
  );
}

export default TagRoutes;
