import { Route, Routes } from "react-router-dom";

import PATH from "@/constants/path";

import AuthRouter from "./auth.router";
import HomeRouter from "./home.router";
import UserRouter from "./user.router";

function Router() {
  return (
    <>
      <Routes>
        <Route path={`${PATH.base.auth}/*`} element={<AuthRouter />} />
        <Route path={`${PATH.base.user}/*`} element={<UserRouter />} />
        <Route path={`${PATH.base.home}*`} element={<HomeRouter />} />
      </Routes>
    </>
  );
}
export default Router;
