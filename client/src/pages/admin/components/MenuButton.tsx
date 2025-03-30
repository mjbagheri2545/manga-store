import { MenuIcon } from "lucide-react";

import { Button, IconWrapper } from "@/components/utility";

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
