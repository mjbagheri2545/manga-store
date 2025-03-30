import { ChevronDown, ChevronUp } from "lucide-react";

import RenderItems from "@/components/ui/RenderItems";
import { List, ListItem, ListItemLink } from "@/components/utility/list";
import PATH from "@/constants/path";
import { useProductGroups } from "@/contexts/ProductGroupsContext";
import { useToggleState } from "@/hooks";

function ProductLinks() {
  const { categories } = useProductGroups();
  const [isOpened, toggleIsOpened] = useToggleState();

  return (
    <ListItem
      isGutterLess
      containerProps={{ className: "flex flex-col pr-4 mt-2" }}
    >
      <button
        onClick={toggleIsOpened}
        className="bg-transparent hover:text-primary hover:bg-primary/15 w-fit px-4 py-2 border-none text-right flex gap-2 items-center rounded transition"
      >
        محصولات
        {isOpened ? (
          <ChevronUp className="size-5 mt-1" />
        ) : (
          <ChevronDown className="size-5 mt-1" />
        )}
      </button>
      {isOpened && (
        <List className="pr-4 py-2">
          <ListItemLink to={PATH.base.product}>همه</ListItemLink>
          <RenderItems
            items={categories}
            renderItem={(item) => (
              <ListItemLink to={PATH.product.byCategory(item.slug)}>
                {item.name}
              </ListItemLink>
            )}
          />
        </List>
      )}
    </ListItem>
  );
}

export default ProductLinks;
