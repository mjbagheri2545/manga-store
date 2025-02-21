import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer, PropsWithOptionalIcon } from "@/types";
import { cn } from "@/utils";

import IconWrapper from "../IconWrapper";

export type ListItemProps = PropsWithOptionalIcon &
  PropsWithContainer<"li", false> &
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
        !isGutterLess && "px-4 py-3 flex gap-2 flex-1 min-w-fit",
        containerProps?.className
      )}
    >
      {"Icon" in restProps && (
        <IconWrapper
          Icon={restProps.Icon}
          iconProps={{
            ...restProps.iconProps,
            className: twMerge("mr-4", restProps.iconProps?.className),
          }}
        />
      )}
      {children}
    </li>
  );
}
