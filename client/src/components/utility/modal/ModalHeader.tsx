import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { PropsWithContainer, PropsWithOptionalIcon } from "@/types";

type ModalHeaderProps = PropsWithOptionalIcon &
  PropsWithChildren &
  PropsWithContainer;

export function ModalHeader({
  children,
  containerProps,
  ...restProps
}: ModalHeaderProps) {
  return (
    <div
      {...containerProps}
      className={twMerge("mb-6 text-xl font-bold", containerProps?.className)}
    >
      {"Icon" in restProps && (
        <restProps.Icon
          size={64}
          {...restProps.iconProps}
          className={twMerge("mb-2", restProps.iconProps?.className)}
        />
      )}
      {children}
    </div>
  );
}
