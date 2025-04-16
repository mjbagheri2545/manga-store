import { lazy } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import SuspenseWithSpinner from "@/components/ui/SuspenseWithSpinner";

const ChaptersPage = lazy(
  () => import("@/pages/admin/items/chapter/ChaptersPage")
);
const ChapterInfoPage = lazy(
  () => import("@/pages/admin/items/chapter/ChapterInfoPage")
);
const CreateChapterPage = lazy(
  () => import("@/pages/admin/items/chapter/CreateChapterPage")
);
const UpdateChapterPage = lazy(
  () => import("@/pages/admin/items/chapter/UpdateChapterPage")
);

function ChapterRoutes() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route
          element={
            <SuspenseWithSpinner key={location.pathname}>
              <Outlet />
            </SuspenseWithSpinner>
          }
        >
          <Route index element={<ChaptersPage />} />
          <Route path="create" element={<CreateChapterPage />} />
          <Route path=":chapterId" element={<ChapterInfoPage />} />
          <Route path="edit/:chapterId" element={<UpdateChapterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default ChapterRoutes;
