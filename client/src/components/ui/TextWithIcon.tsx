import React, { ComponentProps } from "react";

import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type TextWithIconProps = Omit<ComponentProps<"div">, "children"> & {
  Icon: LucideIcon;
  children: React.ReactNode;
};

function TextWithIcon({
  children,
  Icon,
  className,
  ...restProps
}: TextWithIconProps) {
  return (
    <div
      {...restProps}
      className={twMerge("flex gap-2 items-center", className)}
    >
      <Icon className="size-5" />
      {typeof children === "string" ? (
        <span className="flex-1">{children}</span>
      ) : (
        children
      )}
    </div>
  );
}

export default TextWithIcon;
