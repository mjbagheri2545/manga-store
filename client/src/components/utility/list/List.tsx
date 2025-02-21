import { ComponentProps } from "react";

import { cn } from "@/utils";

export type ListProps = ComponentProps<"ul"> &
  Partial<{
    isDirectionRow: boolean;
    isWrap: boolean;
    isJustifyCenter: boolean;
    isItemsCenter: boolean;
  }>;

/*
i use isDirectionRow because of this:
if i want row list i just use it like this: 
<List isDirectionRow />
and if i want column list i use it like this:
<List />
if i use isDirectionColumn we have this:
row list: <List isDirectionColumn={false} />
column list: <List />
the first one is more simpler and faster to use
*/

export function List({
  className,
  isDirectionRow = false,
  isItemsCenter,
  isJustifyCenter,
  isWrap,
  children,
  ...restProps
}: ListProps) {
  const listClassName = cn(
    "flex gap-4",
    !isDirectionRow && "flex-col",
    isItemsCenter && "items-center",
    isJustifyCenter && "justify-center",
    isWrap && "flex-wrap",
    className
  );

  return (
    <ul {...restProps} className={listClassName}>
      {children}
    </ul>
  );
}
