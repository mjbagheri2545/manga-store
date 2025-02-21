import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export function ModalContent({
  children,
  className,
  ...restProps
}: ComponentProps<"div">) {
  return (
    <div
      {...restProps}
      className={twMerge("modal-box max-[480px]:p-4", className)}
      role="dialog"
    >
      {children}
    </div>
  );
}
