import { Outlet } from "react-router-dom";

import { useToggleState } from "@/hooks";

import { SidebarContext } from "../contexts/SidebarContext";
import AdminRoute from "./AdminRoute";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function AdminLayout() {
  const [isOpened, toggleIsOpened] = useToggleState();

  return (
    <AdminRoute>
      <div className="flex flex-1 h-svh overflow-hidden">
        <SidebarContext.Provider value={{ isOpened, toggleIsOpened }}>
          <Sidebar />
          <div
            className="flex-1 overflow-y-auto px-5 pb-8 ml-auto max-w-[1440px] min-[1728px]:pl-0"
            dir="ltr"
          >
            <Navbar />
            <main
              className="flex flex-col flex-1 items-center gap-5 mt-5"
              dir="rtl"
            >
              <Outlet />
            </main>
          </div>
        </SidebarContext.Provider>
      </div>
    </AdminRoute>
  );
}

export default AdminLayout;
