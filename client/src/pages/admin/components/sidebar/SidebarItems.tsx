import { useState } from "react";
import { useLocation } from "react-router-dom";

import { List } from "@/components/utility/list";
import RenderItems from "@/components/utility/RenderItems";

import { SIDEBAR_ITEMS } from "../../constants";
import SidebarItem from "./SidebarItem";

function SidebarItems() {
  const { pathname } = useLocation();
  // index !== 0 because href is "/" and is true
  // in every iteration
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = SIDEBAR_ITEMS.findIndex(
      (item, index) => pathname.includes(item.to) && index !== 0
    );
    return index !== -1 ? index : 0;
  });

  return (
    <List className="gap-2.5" dir="rtl">
      <RenderItems
        items={SIDEBAR_ITEMS}
        renderItem={(item, index) => {
          return (
            <SidebarItem
              {...item}
              isActive={index === activeIndex}
              handleOnChangeActiveIndex={() => setActiveIndex(index)}
            />
          );
        }}
      />
    </List>
  );
}

export default SidebarItems;
