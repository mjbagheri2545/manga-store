import { BellIcon } from "lucide-react";

import { Button, Link } from "@/components/utility";
import { List, ListItem, ListItemLink } from "@/components/utility/list";
import PATH from "@/constants/path";

import ProductsDropdown from "./ProductsDropdown";
import SearchField from "./SearchField";
import UserAvatar from "./UserAvatar";

function NavbarItemsLg() {
  return (
    <div className="flex items-center w-full">
      <List className="gap-3 flex-row items-center">
        <ListItemLink
          listItemProps={{
            containerProps: {
              className: "flex-initial last:ml-16",
            },
          }}
          to={PATH.home.landingPage}
        >
          صفحه اصلی
        </ListItemLink>
        <ProductsDropdown />
        <ListItem
          isGutterLess
          containerProps={{
            className: "flex-initial last:ml-16",
          }}
        >
          <Link
            to={PATH.home.tagsPage}
            variant="navigation"
            className="px-4 py-2"
          >
            ژانر ها
          </Link>
        </ListItem>
      </List>
      <SearchField
        containerProps={{
          className:
            "flex-1 ml-4 max-w-lg mr-auto [&>div]:h-0 [&>button]:h-[44px] [&>button]:pt-2.5 [&>button]:pb-3.5 [&_input]:border-solid [&_input]:border-2 [&_input]:border-primary [&_input]:border-l-0",
        }}
      />
      <Button variant="icon">
        <BellIcon />
      </Button>
      <UserAvatar />
    </div>
  );
}

export default NavbarItemsLg;
