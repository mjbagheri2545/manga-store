import { Route, Routes } from "react-router-dom";

import ProductsByCategoryPage from "@/pages/product/ProductsByCategoryPage";
import ProductsByTagPage from "@/pages/product/ProductsByTagPage";
import ProductsPage from "@/pages/product/ProductsPage";

function ProductRouter() {
  return (
    <Routes>
      <Route index element={<ProductsPage />} />
      <Route path="category/:category" element={<ProductsByCategoryPage />} />
      <Route path="tag/:tag" element={<ProductsByTagPage />} />
    </Routes>
  );
}

export default ProductRouter;
