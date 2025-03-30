import { Route, Routes } from "react-router-dom";

import PATH from "@/constants/path";
import AdminLayout from "@/pages/admin/components/Layout";

import CategoryRoutes from "./category.routes";
import ProductRoutes from "./product.routes";
import ProductStatusRoutes from "./productStatus.routes";
import TagRoutes from "./tag.routes";
import UserRoutes from "./user.routes";

function AdminRouter() {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path={`${PATH.getPathForRoute(PATH.base.category)}/*`}
            element={<CategoryRoutes />}
          />
          <Route
            path={`${PATH.getPathForRoute(PATH.base.tag)}/*`}
            element={<TagRoutes />}
          />
          <Route
            path={`${PATH.getPathForRoute(PATH.base.productStatus)}/*`}
            element={<ProductStatusRoutes />}
          />
          <Route
            path={`${PATH.getPathForRoute(PATH.base.product)}/*`}
            element={<ProductRoutes />}
          />
          <Route
            path={`${PATH.getPathForRoute(PATH.base.user)}/*`}
            element={<UserRoutes />}
          />
          <Route
            path="*"
            element={<p className="text-2xl">صفحه طراحی نشده است</p>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRouter;
