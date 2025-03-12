import { Route, Routes } from "react-router-dom";

import PATH from "@/constants/path";
import LandingPage from "@/pages/home/LandingPage";
import TagsPage from "@/pages/home/TagsPage";

function HomeRouter() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route
        path={PATH.getPathForRoute(PATH.base.tag)}
        element={<TagsPage />}
      />
    </Routes>
  );
}

export default HomeRouter;
