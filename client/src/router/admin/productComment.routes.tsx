import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";

const ProductCommentInfoPage = lazy(
  () => import("@/pages/admin/items/productComment/ProductCommentInfoPage")
);
const AdminProductCommentsPage = lazy(
  () => import("@/pages/admin/items/productComment/AdminProductCommentsPage")
);

function ProductCommentRoutes() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <SuspenseWithSpinner key="adminProductCommentsPage">
              <AdminProductCommentsPage />
            </SuspenseWithSpinner>
          }
        />
        <Route
          path=":productCommentId"
          element={
            <SuspenseWithSpinner key="productCommentInfoPage">
              <ProductCommentInfoPage />
            </SuspenseWithSpinner>
          }
        />
      </Routes>
    </>
  );
}

export default ProductCommentRoutes;
