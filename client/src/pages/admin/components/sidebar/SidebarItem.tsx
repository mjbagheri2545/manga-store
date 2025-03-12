import { LucideIcon } from "lucide-react";

import { Link } from "@/components/utility";
import IconWrapper from "@/components/utility/IconWrapper";
import { ListItem } from "@/components/utility/list";
import PATH from "@/constants/path";
import { cn } from "@/utils";

import { useSidebar } from "../../contexts/SidebarContext";

type SidebarItemProps = {
  Icon: LucideIcon;
  title: string;
  to: string;
  isActive: boolean;
  handleOnChangeActiveIndex: () => void;
};

function SidebarItem({
  Icon,
  title,
  to,
  isActive,
  handleOnChangeActiveIndex,
}: SidebarItemProps) {
  const { isOpened } = useSidebar();

  const textClassName = cn(
    "text-lg visible mr-2 opacity-100 transition-all text-white",
    !isOpened && "w-0 opacity-0 m-0 invisible"
  );

  const linkClassName = cn(
    "flex items-center px-5 py-4 h-16 transition relative z-10",
    isActive ? "bg-dark-body" : "hover:bg-gray-700/60",
    !isOpened && "justify-center"
  );

  return (
    <ListItem
      isGutterLess
      containerProps={{ onClick: handleOnChangeActiveIndex }}
    >
      <Link to={`${PATH.base.admin}/${to}`} className={linkClassName}>
        <IconWrapper Icon={Icon} />
        <span className={textClassName}>{title}</span>
      </Link>
    </ListItem>
  );
}

export default SidebarItem;
