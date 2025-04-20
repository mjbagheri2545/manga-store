import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/components/ui/layout";
import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";
import PATH from "@/constants/path";
import NotFoundPage from "@/pages/notFound";

import AdminRouter from "./admin";
import AuthRouter from "./auth.router";
import ProductRouter from "./product.router";
import UserRouter from "./user.router";

const LandingPage = lazy(() => import("@/pages/home/LandingPage"));
const TagsPage = lazy(() => import("@/pages/home/TagsPage"));

function Router() {
  return (
    <>
      <Routes>
        <Route path={`${PATH.base.auth}/*`} element={<AuthRouter />} />
        <Route path={`${PATH.base.user}/*`} element={<UserRouter />} />
        <Route element={<MainLayout />}>
          <Route path={`${PATH.base.product}/*`} element={<ProductRouter />} />
          <Route path={PATH.base.home} element={<Outlet />}>
            <Route
              index
              element={
                <SuspenseWithSpinner key="landingPage">
                  <LandingPage />
                </SuspenseWithSpinner>
              }
            />
            <Route
              path={PATH.getPathForRoute(PATH.base.tag)}
              element={
                <SuspenseWithSpinner key="tagsPage">
                  <TagsPage />
                </SuspenseWithSpinner>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
}
export default Router;
