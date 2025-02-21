import React from "react";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { PropsWithContainer, PropsWithOptionalIcon } from "@/types";
import { cn } from "@/utils";

import IconWrapper from "./IconWrapper";

const alertStyles = cva("rounded", {
  variants: {
    type: {
      info: "bg-alert-bgInfo text-alert-colorInfo [&_svg]:text-info",
      success:
        "bg-alert-bgSuccess text-alert-colorSuccess [&_svg]:text-success",
      warning:
        "bg-alert-bgWarning text-alert-colorWarning [&_svg]:text-warning",
      error: "bg-alert-bgError text-alert-colorError [&_svg]:text-error",
    },
  },
});

export type AlertProps = VariantProps<typeof alertStyles> &
  PropsWithContainer<"div", false> & {
    children: React.ReactNode;
  } & PropsWithOptionalIcon;

export function Alert({
  type = "info",
  children,
  containerProps,
  ...restProps
}: AlertProps) {
  const isIconProvided = "Icon" in restProps;

  const className = cn(
    "px-4 py-3",
    alertStyles({ type }),
    isIconProvided && "flex",
    containerProps?.className
  );

  return (
    <div {...containerProps} className={className} role="alert">
      {isIconProvided && (
        <IconWrapper
          Icon={restProps.Icon}
          iconProps={{
            ...restProps.iconProps,
            className: twMerge("ml-2 text", restProps.iconProps?.className),
          }}
        />
      )}
      <p className="flex-1">{children}</p>
    </div>
  );
}
