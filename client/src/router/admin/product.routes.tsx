import { Outlet, Route, Routes } from "react-router-dom";

import { EntitiesProvider } from "@/components/ui/crud";
import PATH from "@/constants/path";
import { CrudProduct } from "@/features/product/api";
import CreateProductPage from "@/pages/admin/items/product/CreateProductPage";
import ProductInfoPage from "@/pages/admin/items/product/ProductInfoPage";
import ProductsPage from "@/pages/admin/items/product/ProductsPage";
import UpdateProductPage from "@/pages/admin/items/product/UpdateProductPage";

import ChapterRoutes from "./chapter.routes";

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
            element={<ChapterRoutes />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default ProductRoutes;
