import { ComponentProps } from "react";

import { cn } from "@/utils";

export type ListProps = ComponentProps<"ul">;

export function List({ className, children, ...restProps }: ListProps) {
  const listClassName = cn("flex gap-4 flex-col", className);

  return (
    <ul {...restProps} className={listClassName}>
      {children}
    </ul>
  );
}
