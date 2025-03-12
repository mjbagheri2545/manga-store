import { useMaxWidth } from "@/hooks";
import { getScreenFromTailwind } from "@/utils";

import NavbarItemsLg from "./NavbarItemsLg";
import NavbarItemsSm from "./NavbarItemsSm";

function NavbarItems() {
  const isMaxWidthLg = useMaxWidth(getScreenFromTailwind("lg"));

  return isMaxWidthLg ? <NavbarItemsSm /> : <NavbarItemsLg />;
}

export default NavbarItems;
