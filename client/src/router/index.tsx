import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@/components/ui/layout";
import PATH from "@/constants/path";

import AdminRouter from "./admin";
import AuthRouter from "./auth.router";
import HomeRouter from "./home.router";
import ProductRouter from "./product.router";
import UserRouter from "./user.router";

function Router() {
  return (
    <>
      <Routes>
        <Route path={`${PATH.base.auth}/*`} element={<AuthRouter />} />
        <Route path={`${PATH.base.user}/*`} element={<UserRouter />} />
        <Route element={<MainLayout />}>
          <Route path={`${PATH.base.product}/*`} element={<ProductRouter />} />
          <Route path={`${PATH.base.home}*`} element={<HomeRouter />} />
        </Route>
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </>
  );
}
export default Router;
