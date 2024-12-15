import { Route, Routes } from "react-router-dom";

import PATH from "@/constants/path";

import AuthRouter from "./auth.router";

function Router() {
  return (
    <>
      <Routes>
        <Route path={`${PATH.base.auth}/*`} element={<AuthRouter />} />
      </Routes>
    </>
  );
}
export default Router;
