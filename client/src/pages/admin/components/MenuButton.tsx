import { MenuIcon } from "lucide-react";

import { Button } from "@/components/utility";
import IconWrapper from "@/components/utility/IconWrapper";

import { useSidebar } from "../contexts/SidebarContext";

function MenuButton({ className }: { className?: string }) {
  const { toggleIsOpened } = useSidebar();

  return (
    <Button onClick={toggleIsOpened} className={className} variant="icon">
      <IconWrapper Icon={MenuIcon} />
    </Button>
  );
}

export default MenuButton;
