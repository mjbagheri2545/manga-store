import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";

type TAdminCrudRoutes = {
  EntityInfo: React.FC;
  EntitiesPage: React.FC;
  CreateEntityPage: React.FC;
  UpdateEntityPage: React.FC;
};

type AdminCrudRoutesProps = {
  routes: TAdminCrudRoutes;
  pathParams?: string;
};

function AdminCrudRoutes({ routes, pathParams = ":id" }: AdminCrudRoutesProps) {
  const location = useLocation();
  return (
    <Routes>
      <Route
        element={
          <SuspenseWithSpinner key={location.pathname}>
            <Outlet />
          </SuspenseWithSpinner>
        }
      >
        <Route index element={<routes.EntitiesPage />} />
        <Route path="create" element={<routes.CreateEntityPage />} />
        <Route path={pathParams} element={<routes.EntityInfo />} />
        <Route path="edit/:id" element={<routes.UpdateEntityPage />} />
      </Route>
    </Routes>
  );
}

export default AdminCrudRoutes;
