import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/home/LandingPage";

function HomeRouter() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
}

export default HomeRouter;
