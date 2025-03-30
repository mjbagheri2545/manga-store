import { BellIcon, MenuIcon, XIcon } from "lucide-react";

import { Button, Divider } from "@/components/utility";
import { List, ListItemLink } from "@/components/utility/list";
import PATH from "@/constants/path";
import { useToggleState } from "@/hooks";
import { cn } from "@/utils";

import ProductLinks from "./ProductLinks";
import SearchField from "./SearchField";
import UserNavbarSm from "./UserNavbarSm";

function NavbarItemsSm() {
  const [isOpened, toggleIsOpened] = useToggleState();

  const listClassName = cn(
    "p-0 px-2 gap-2 h-0 w-full bg-dark absolute z-10 top-[100%] right-0 overflow-hidden transition-all shadow-lg shadow-slate-900",
    isOpened && "h-fit"
  );

  const itemClassName = cn(
    "transition invisible opacity-0",
    isOpened && "visible opacity-100"
  );

  return (
    <>
      <Button onClick={toggleIsOpened} variant="icon" className="mr-auto">
        {isOpened ? <XIcon /> : <MenuIcon />}
      </Button>
      <Button variant="icon" className="mr-2">
        <BellIcon />
      </Button>
      <List className={listClassName}>
        <SearchField
          containerProps={{
            className:
              "max-w-full w-auto mx-[2%] mt-4 mb-2 max-sm:[&>button]:px-4 focus:[&_input]:border-solid focus:[&_input]:border-2 focus:[&_input]:border-primary focus:[&_input]:border-l-0 focus-within:[&_input]:border-solid focus-within:[&_input]:border-2 focus-within:[&_input]:border-primary focus-within:[&_input]:border-l-0",
          }}
        />

        <ListItemLink
          to={PATH.home.landingPage}
          listItemProps={{ containerProps: { className: "pr-4" } }}
        >
          صفحه اصلی
        </ListItemLink>
        <ProductLinks />
        <ListItemLink
          to={PATH.home.tagsPage}
          listItemProps={{ containerProps: { className: "pr-4 mt-2" } }}
        >
          ژانر ها
        </ListItemLink>
        <Divider className={cn("mt-3 max-w-full w-auto", itemClassName)} />
        <UserNavbarSm itemClassName={itemClassName} />
      </List>
    </>
  );
}

export default NavbarItemsSm;
