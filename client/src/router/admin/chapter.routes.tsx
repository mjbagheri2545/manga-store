import { Route, Routes } from "react-router-dom";

import ChapterInfoPage from "@/pages/admin/items/chapter/ChapterInfoPage";
import ChaptersPage from "@/pages/admin/items/chapter/ChaptersPage";
import CreateChapterPage from "@/pages/admin/items/chapter/CreateChapterPage";
import UpdateChapterPage from "@/pages/admin/items/chapter/UpdateChapterPage";

function ChapterRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<ChaptersPage />} />
        <Route path="create" element={<CreateChapterPage />} />
        <Route path=":chapterId" element={<ChapterInfoPage />} />
        <Route path="edit/:chapterId" element={<UpdateChapterPage />} />
      </Routes>
    </>
  );
}

export default ChapterRoutes;
