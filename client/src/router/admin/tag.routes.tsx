import { Route, Routes } from "react-router-dom";

//AdminTagsPage because also we have TagsPage
import { EntitiesProvider } from "@/components/ui/crud";
import AdminTagsPage from "@/pages/admin/items/tag/AdminTagsPage";
import CreateTagPage from "@/pages/admin/items/tag/CreateTagPage";
import TagInfoPage from "@/pages/admin/items/tag/TagInfoPage";
import UpdateTagPage from "@/pages/admin/items/tag/UpdateTagPage";
import { ProductGroup } from "@/types";

import AdminCrudRoutes from "./crud.routes";

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
