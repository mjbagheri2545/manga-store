import { lazy } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";
import PATH from "@/constants/path";
import ProductProvider from "@/features/product/components/ProductProvider";
const ProductsPage = lazy(() => import("@/pages/product/ProductsPage"));
const ProductsByTagPage = lazy(
  () => import("@/pages/product/ProductsByTagPage")
);
const ProductsByCategoryPage = lazy(
  () => import("@/pages/product/ProductsByCategoryPage")
);
const TranslatorsListSection = lazy(
  () =>
    import("@/features/product/components/translators/TranslatorsListSection")
);
const SingleProductPage = lazy(
  () => import("@/pages/product/singleProductPage")
);
const ChaptersListSection = lazy(
  () => import("@/features/chapter/components/ChapterListSection")
);
const ChapterPage = lazy(() => import("@/pages/chapter/ChapterPage"));
const ProductCommentsPage = lazy(
  () => import("@/pages/productComment/ProductCommentsPage")
);

function ProductRouter() {
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
        <Route index element={<ProductsPage />} />
        <Route path="category/:category" element={<ProductsByCategoryPage />} />
        <Route path="tag/:tag" element={<ProductsByTagPage />} />
        <Route
          path=":slug"
          element={
            <ProductProvider>
              <SuspenseWithSpinner key={location.pathname}>
                <Outlet />
              </SuspenseWithSpinner>
            </ProductProvider>
          }
        >
          <Route index element={<SingleProductPage />} />
          <Route path="translators" element={<TranslatorsListSection />} />
          <Route path={PATH.getPathForRoute(PATH.base.chapter)}>
            <Route
              index
              element={
                <SuspenseWithSpinner key="chaptersListSection">
                  <ChaptersListSection />
                </SuspenseWithSpinner>
              }
            />
            <Route
              path=":chapterId"
              element={
                <SuspenseWithSpinner key="chapterPage">
                  <ChapterPage />
                </SuspenseWithSpinner>
              }
            />
          </Route>
          <Route
            path={PATH.getPathForRoute(PATH.base.productComment)}
            element={<ProductCommentsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default ProductRouter;
