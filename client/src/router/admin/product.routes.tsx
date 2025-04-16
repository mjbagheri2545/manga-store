import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import PATH from "@/constants/path";
import { CrudProduct } from "@/features/product/api";
import ChapterPageWrapper from "@/pages/admin/items/chapter/ChapterPageWrapper";
import ProductCommentPageWrapper from "@/pages/admin/items/productComment/ProductCommentPageWrapper";

import ChapterRoutes from "./chapter.routes";
import ProductCommentRoutes from "./productComment.routes";

const ProductsPage = lazy(
  () => import("@/pages/admin/items/product/ProductsPage")
);
const ProductInfoPage = lazy(
  () => import("@/pages/admin/items/product/ProductInfoPage")
);
const CreateProductPage = lazy(
  () => import("@/pages/admin/items/product/CreateProductPage")
);
const UpdateProductPage = lazy(
  () => import("@/pages/admin/items/product/UpdateProductPage")
);

function ProductRoutes() {
  return (
    <>
      <Routes>
        <Route
          element={
            <EntitiesProvider<CrudProduct>>
              <Outlet />
            </EntitiesProvider>
          }
        >
          <Route index element={<ProductsPage />} />
          <Route path="create" element={<CreateProductPage />} />
          <Route path=":productId" element={<ProductInfoPage />} />
          <Route path="edit/:id" element={<UpdateProductPage />} />
          <Route
            path={`:productId${PATH.base.chapter}/*`}
            element={<ChapterPageWrapper />}
          >
            <Route path="*" element={<ChapterRoutes />} />
          </Route>
          <Route
            path={`:productId${PATH.base.productComment}/*`}
            element={<ProductCommentPageWrapper />}
          >
            <Route path="*" element={<ProductCommentRoutes />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default ProductRoutes;
