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
};

function AdminCrudRoutes({ routes }: AdminCrudRoutesProps) {
  return (
    <Routes>
      <Route index element={<routes.EntitiesPage />} />
      <Route path="create" element={<routes.CreateEntityPage />} />
      <Route path=":id" element={<routes.EntityInfo />} />
      <Route path="edit/:id" element={<routes.UpdateEntityPage />} />
    </Routes>
  );
}

export default AdminCrudRoutes;
