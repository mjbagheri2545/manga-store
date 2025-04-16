import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import { GetAllUserBase } from "@/features/user/api/crud.api";

import AdminCrudRoutes from "./crud.routes";

const UsersPage = lazy(() => import("@/pages/admin/items/user/UsersPage"));
const UserInfoPage = lazy(
  () => import("@/pages/admin/items/user/UserInfoPage")
);
const CreateUserPage = lazy(
  () => import("@/pages/admin/items/user/CreateUserPage")
);
const UpdateUserPage = lazy(
  () => import("@/pages/admin/items/user/UpdateUserPage")
);

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <EntitiesProvider<GetAllUserBase>>
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
