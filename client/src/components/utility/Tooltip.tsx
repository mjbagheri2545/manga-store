import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

type TooltipProps = ComponentProps<"div"> & {
  title: string;
};

export function Tooltip({
  children,
  title,
  className,
  ...restProps
}: TooltipProps) {
  return (
    <div
      {...restProps}
      className={twMerge("tooltip", className)}
      data-tip={title}
    >
      {children}
    </div>
  );
}
