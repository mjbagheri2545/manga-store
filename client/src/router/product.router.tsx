import { Outlet, Route, Routes } from "react-router-dom";

import ChaptersListSection from "@/features/chapter/components/ChapterListSection";
import ProductProvider from "@/features/product/components/ProductProvider";
import TranslatorsListSection from "@/features/product/components/translators/TranslatorsListSection";
import ProductsByCategoryPage from "@/pages/product/ProductsByCategoryPage";
import ProductsByTagPage from "@/pages/product/ProductsByTagPage";
import ProductsPage from "@/pages/product/ProductsPage";
import SingleProductPage from "@/pages/product/singleProductPage";

function ProductRouter() {
  return (
    <Routes>
      <Route index element={<ProductsPage />} />
      <Route path="category/:category" element={<ProductsByCategoryPage />} />
      <Route path="tag/:tag" element={<ProductsByTagPage />} />
      <Route
        path=":slug"
        element={
          <ProductProvider>
            <Outlet />
          </ProductProvider>
        }
      >
        <Route index element={<SingleProductPage />} />
        <Route path="translators" element={<TranslatorsListSection />} />
        <Route path="chapters" element={<ChaptersListSection />} />
      </Route>
    </Routes>
  );
}

export default ProductRouter;
