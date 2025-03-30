import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { GetAllUserType } from "@/features/user/api/crud.api";
import CreateUserPage from "@/pages/admin/items/user/CreateUserPage";
import UpdateUserPage from "@/pages/admin/items/user/UpdateUserPage";
import UserInfoPage from "@/pages/admin/items/user/UserInfoPage";
import UsersPage from "@/pages/admin/items/user/UsersPage";

import AdminCrudRoutes from "./crud.routes";

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <EntitiesProvider<GetAllUserType>>
              <AdminCrudRoutes
                routes={{
                  EntityInfo: UserInfoPage,
                  CreateEntityPage: CreateUserPage,
                  UpdateEntityPage: UpdateUserPage,
                  EntitiesPage: UsersPage,
                }}
              />
            </EntitiesProvider>
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
