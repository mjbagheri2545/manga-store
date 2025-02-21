import { useMaxWidth } from "@/hooks";
import { cn, getScreenFromTailwind } from "@/utils";

import { useSidebar } from "../../contexts/SidebarContext";
import MenuButton from "../MenuButton";
import SidebarItems from "./SidebarItems";

function Sidebar() {
  const isMaxWidthLg = useMaxWidth(getScreenFromTailwind("lg"));
  const { isOpened } = useSidebar();

  const sidebarClassName = cn(
    "bg-dark p-4 flex flex-col w-72 transition-all z-50",
    isMaxWidthLg
      ? "absolute top-0 right-0 translate-x-[100%] h-full"
      : "h-full",
    !isOpened && "w-28",
    isMaxWidthLg && isOpened && "translate-x-0"
  );

  return (
    <aside className={sidebarClassName}>
      {isMaxWidthLg && (
        <MenuButton
          className={cn(
            "absolute top-12 -left-6 bg-gray-900 hover:bg-gray-900 invisible opacity-0 z-50 shadow shadow-slate-800/40",
            isOpened && "visible opacity-100"
          )}
        />
      )}
      <img src="/logo.svg" className="w-1/4 mb-8 mx-auto min-w-8" alt="logo" />

      <div className="overflow-hidden">
        <div className="overflow-auto h-full" dir="ltr">
          <SidebarItems />
        </div>
      </div>
      {isMaxWidthLg && isOpened && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}
    </aside>
  );
}

export default Sidebar;
