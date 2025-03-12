import { PropsWithChildren } from "react";
import { To } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { Link, LinkProps } from "../Link";
import { ListItem, ListItemProps } from "./ListItem";

type ListItemLinkProps = PropsWithChildren & {
  listItemProps?: ListItemProps;
  linkProps?: Omit<LinkProps, "to">;
  to: To;
};

export function ListItemLink({
  listItemProps,
  linkProps,
  children,
  to,
}: ListItemLinkProps) {
  return (
    <ListItem isGutterLess {...listItemProps}>
      <Link
        variant="navigation"
        {...linkProps}
        to={to}
        className={twMerge("px-4 py-2", linkProps?.className)}
      >
        {children}
      </Link>
    </ListItem>
  );
}
