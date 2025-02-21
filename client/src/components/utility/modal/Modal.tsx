import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export function Modal({ children, ...restProps }: ComponentProps<"dialog">) {
  return (
    <dialog
      {...restProps}
      className={twMerge(
        "modal h-auto max-[480px]:pr-4 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2",
        restProps?.className
      )}
      open
      role="presentation"
    >
      {children}
    </dialog>
  );
}
