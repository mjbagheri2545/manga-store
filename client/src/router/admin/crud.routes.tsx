import React from "react";
import { Route, Routes } from "react-router-dom";

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
  return (
    <Routes>
      <Route index element={<routes.EntitiesPage />} />
      <Route path="create" element={<routes.CreateEntityPage />} />
      <Route path={pathParams} element={<routes.EntityInfo />} />
      <Route path="edit/:id" element={<routes.UpdateEntityPage />} />
    </Routes>
  );
}

export default AdminCrudRoutes;
