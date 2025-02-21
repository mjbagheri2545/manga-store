import { Route, Routes } from "react-router-dom";

import CreateCategoryForm from "@/features/category/components/CreateCategoryForm";
import LandingPage from "@/pages/home/LandingPage";

function HomeRouter() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="test" element={<CreateCategoryForm />} />
    </Routes>
  );
}

export default HomeRouter;
