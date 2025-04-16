import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";
import PATH from "@/constants/path";

const LandingPage = lazy(() => import("@/pages/home/LandingPage"));
const TagsPage = lazy(() => import("@/pages/home/TagsPage"));

function HomeRouter() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default HomeRouter;
