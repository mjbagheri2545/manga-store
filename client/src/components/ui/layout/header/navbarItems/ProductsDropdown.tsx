import { Link as ReactRouterLink } from "react-router-dom";

import RenderItems from "@/components/ui/RenderItems";
import { Dropdown } from "@/components/utility";
import { ListItem } from "@/components/utility/list";
import PATH from "@/constants/path";
import { useProductGroups } from "@/contexts/ProductGroupsContext";

function ProductsDropdown() {
  const { categories } = useProductGroups();

  return (
    <ListItem
      isGutterLess
      containerProps={{
        className: "flex-initial last:ml-16",
      }}
    >
      <Dropdown
        title="محصولات"
        dropdownButtonProps={{
          className:
            "bg-transparent border-none hover:text-primary hover:bg-primary/15 rounded min-h-10 h-10",
        }}
      >
        {(onClose) => (
          <>
            <ListItem isGutterLess containerProps={{ onClick: onClose }}>
              <ReactRouterLink
                to={PATH.base.product}
                className="inline-block px-4 py-2"
              >
                همه
              </ReactRouterLink>
            </ListItem>
            <RenderItems
              items={categories}
              renderItem={(item) => (
                <ListItem isGutterLess containerProps={{ onClick: onClose }}>
                  <ReactRouterLink
                    to={PATH.product.byCategory(item.slug)}
                    className="inline-block px-4 py-2"
                  >
                    {item.name}
                  </ReactRouterLink>
                </ListItem>
              )}
            />
          </>
        )}
      </Dropdown>
    </ListItem>
  );
}

export default ProductsDropdown;
