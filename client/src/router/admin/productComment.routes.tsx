import { Route, Routes } from "react-router-dom";

import ProductCommentInfoPage from "@/pages/admin/items/productComment/ProductCommentInfoPage";
import ProductCommentsPage from "@/pages/admin/items/productComment/ProductCommentsPage";

function ProductCommentRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<ProductCommentsPage />} />
        <Route path=":productCommentId" element={<ProductCommentInfoPage />} />
      </Routes>
    </>
  );
}

export default ProductCommentRoutes;
