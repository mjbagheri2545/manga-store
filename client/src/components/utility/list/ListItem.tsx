import { PropsWithChildren } from "react";

import { PropsWithContainer, PropsWithOptionalIcon } from "@/types";
import { cn } from "@/utils";

import IconWrapper from "../IconWrapper";

export type ListItemProps = PropsWithOptionalIcon &
  PropsWithContainer<"li"> &
  PropsWithChildren & {
    isGutterLess?: boolean;
  };

export function ListItem({
  containerProps,
  isGutterLess = false,
  children,
  ...restProps
}: ListItemProps) {
  return (
    <li
      {...containerProps}
      className={cn(
        "flex gap-2 flex-1 min-w-fit",
        !isGutterLess && "px-4 py-3",
        containerProps?.className
      )}
    >
      {"Icon" in restProps && (
        <IconWrapper Icon={restProps.Icon} iconProps={restProps.iconProps} />
      )}
      {children}
    </li>
  );
}
